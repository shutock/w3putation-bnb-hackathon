import { readableError } from "./../../lib/utils/readable-error";
import { opBNB } from "@/lib";
import { useContractStore } from "./contract.store";
import { getContract } from "./lib";

import type { IData } from "../score/score.type";

import { ethers, type BigNumber } from "ethers";
import { useSigner, type Address, useNetwork, useSwitchNetwork } from "wagmi";
import { IToken, ITokenRaw, ITokenResponse } from "./lib/types";
import React from "react";
import { event } from "nextjs-google-analytics";

type GetReferralData = (props: { address: Address }) => void;

type GetToken = (props: {
  address: Address;
  blockchainId: number;
  calculationModel: number;
}) => void;

type MintToken = (props: IData["mintData"]) => void;

type ClaimReward = () => void;

const contractAddress = "0xC388Fae5C90E0Fb95CA1E76674A3439db07A6579";
const rpc = opBNB.rpcUrls.public.http[0];

const isDebug = false;

export const useContract = () => {
  const {
    referral,
    setReferralData,
    setReferralError,
    setReferralIsLoading,
    token,
    setTokenData,
    setTokenError,
    setTokenIsLoading,
    mint,
    setMintData,
    setMintError,
    setMintIsLoading,
    claimReward,
    setClaimRewardData,
    setClaimRewardError,
    setClaimRewardIsLoading,
  } = useContractStore((state) => state);

  const { data: signer } = useSigner();

  const { chain } = useNetwork();
  const { switchNetworkAsync } = useSwitchNetwork();

  const getReferralData: GetReferralData = async ({ address }) => {
    try {
      setReferralError(null);
      setReferralIsLoading(true);

      const contract = getContract({ address: contractAddress, rpc });

      const claimableReward = ethers.utils.formatEther(
        (await contract["getClaimableReward"](address)) as BigNumber
      );

      const referralCode = (await contract["getReferralCode"](
        address
      )) as string;
      const referrals = (await contract["getWalletsByReferrerCode"](
        referralCode
      )) as Address[];

      const rewardPerReferral = ethers.utils.formatEther(
        (await contract["getReferralReward"]()) as BigNumber
      );

      const data = { claimableReward, referrals, rewardPerReferral };

      setReferralData({ ...data, code: referralCode });
      setReferralIsLoading(false);
    } catch (err) {
      const readableErr = readableError(err);
      setReferralError(readableErr);
      setReferralIsLoading(false);
    }
  };

  const claim: ClaimReward = async () => {
    try {
      setClaimRewardError(null);
      setClaimRewardIsLoading(true);
      if (!signer) throw new Error("You need to connect first");
      // isDebug && console.log("got signer");

      const address = await signer.getAddress();

      const contract = getContract({ address: contractAddress, signer });
      // isDebug && console.log("got contract");

      const claimableReward = ethers.utils.formatEther(
        (await contract["getClaimableReward"](address)) as BigNumber
      );
      // isDebug && console.log("got claimableReward: ", claimableReward);

      if (Number(claimableReward) === 0) throw new Error("No rewards to claim");

      const { hash } = await contract["claimReferralRewards"]();

      setClaimRewardData({ trx: { hash } });
      setClaimRewardIsLoading(false);
    } catch (err) {
      const readableErr = readableError(err);
      setClaimRewardError(readableErr);
      setClaimRewardIsLoading(true);
    }
  };

  const getToken: GetToken = async ({
    address,
    blockchainId,
    calculationModel,
  }) => {
    try {
      setTokenError(null);
      setTokenIsLoading(true);
      //@ts-ignore
      setTokenData(null);

      const contract = getContract({ address: contractAddress, rpc });

      // isDebug && console.log("got contract");

      const { chainId, tokenId, updated, ...rest } = (await contract[
        "getScore"
      ](address, blockchainId, calculationModel)) as ITokenRaw<BigNumber>;

      // isDebug &&
      //   console.log("got score: ", { chainId, tokenId, updated, ...rest });

      const formattedToken: ITokenRaw<number> = {
        ...rest,
        chainId: chainId.toNumber(),
        tokenId: tokenId.toNumber(),
        updated: updated.toNumber(),
      };

      // isDebug && console.log("formatted score: ", formattedToken);

      const tokenUri = await contract["tokenURI"](tokenId);

      // isDebug && console.log("got tokenUri: ", tokenUri);

      const response = (await (await fetch(tokenUri)).json()) as ITokenResponse;

      // isDebug && console.log("got response: ", response);

      const data: IToken = { ...formattedToken, ...response };

      // isDebug && console.log("got data: ", data);

      setTokenData({ data });
      setTokenIsLoading(false);
      return data;
    } catch (err) {
      const readableErr = readableError(err);
      setTokenError(readableErr);
      setTokenIsLoading(false);
    }
  };

  React.useEffect(() => {
    setMintError(null);
    setMintIsLoading(false);
    //@ts-ignore
    setMintData({ isWhitelisted: null, trx: { hash: null } });
  }, [signer]);

  const mintToken: MintToken = async ({
    calculationModel,
    chainId,
    deadline,
    metadataUrl,
    mintedScore,
    signature,
    referralCode,
    referrerCode,
    mintedChain,
  }) => {
    try {
      setMintError(null);
      setMintIsLoading(true);
      //@ts-ignore
      setMintData({ isWhitelisted: null, trx: { hash: null } });

      if (!signer) throw new Error("You need to connect first");
      // isDebug && console.log("got signer");

      if (!chain) throw new Error("You need to connect first");
      // isDebug && console.log("got chain: ", chain.id);

      if (chain.id !== mintedChain.chainId)
        //@ts-ignore
        switchNetworkAsync(mintedChain.chainId);
      // isDebug && console.log("correct chain: ", mintedChain.chainId);

      const contract = getContract({ address: contractAddress, signer });
      // isDebug && console.log("got contract");

      const address = await signer.getAddress();

      // isDebug && console.log("got address: ", address);

      let value: string;

      const isWhitelisted = (await contract["whitelist"](
        address,
        10
      )) as boolean;

      // isDebug && console.log("got whitelist: ", isWhitelisted);

      if (isWhitelisted) {
        value = "0";

        const { hash } = await contract["setScore"](
          signature,
          mintedScore,
          calculationModel,
          deadline,
          metadataUrl,
          chainId,
          referralCode,
          referrerCode,
          { value }
        );

        // isDebug && console.log("got hash: ", hash);

        setMintData({ isWhitelisted, trx: { hash } });
        setMintIsLoading(false);

        return;
      }

      const token = (await contract["getScore"](
        address,
        opBNB.id,
        calculationModel
      )) as ITokenRaw<BigNumber>;

      const isUpdate = token.score !== 0 ? true : false;

      // isDebug && console.log("isUpdate: ", isUpdate);

      event(isUpdate ? "update_score" : "mint_score", {
        chain: "zksync",
        address,
      });

      if (isUpdate) {
        const individualUpdateFee = (
          (await contract["getIndividualUpdateFee"](
            address,
            calculationModel
          )) as BigNumber
        ).toString();

        // isDebug &&
        //   console.log("got individualUpdateFee: ", individualUpdateFee);

        if (Number(individualUpdateFee) > 0) {
          value = individualUpdateFee;
          const { hash } = await contract["setScore"](
            signature,
            mintedScore,
            calculationModel,
            deadline,
            metadataUrl,
            chainId,
            referralCode,
            referrerCode,
            { value }
          );
          // isDebug && console.log("got hash: ", hash);

          event("updated_score", {
            chain: "zksync",
            address,
          });

          setMintData({ isWhitelisted, trx: { hash } });
          setMintIsLoading(false);

          return;
        }

        const updateFee = (
          (await contract["getUpdateFee"]()) as BigNumber
        ).toString();

        value = updateFee;

        const { hash } = await contract["setScore"](
          signature,
          mintedScore,
          calculationModel,
          deadline,
          metadataUrl,
          chainId,
          referralCode,
          referrerCode,
          { value }
        );
        // isDebug && console.log("got hash: ", hash);

        event("updated_score", {
          chain: "zksync",
          address,
        });

        setMintData({ isWhitelisted, trx: { hash } });
        setMintIsLoading(false);

        return;
      }

      const individualMintFee = (
        (await contract["getIndividualMintFee"](
          address,
          calculationModel
        )) as BigNumber
      ).toString();
      // isDebug &&
      //   console.log(
      //     "got individualMintFee: ",
      //     ethers.utils.formatEther(individualMintFee)
      //   );

      if (Number(individualMintFee) > 0) {
        value = individualMintFee;
        const { hash } = await contract["setScore"](
          signature,
          mintedScore,
          calculationModel,
          deadline,
          metadataUrl,
          chainId,
          referralCode,
          referrerCode,
          { value }
        );
        // isDebug && console.log("got hash: ", hash);

        event("minted_score", {
          chain: "zksync",
          address,
        });

        setMintData({ isWhitelisted, trx: { hash } });
        setMintIsLoading(false);

        return;
      }

      const mintFee = (
        (await contract["getMintFee"]()) as BigNumber
      ).toString();
      // isDebug && console.log("got mintFee: ", mintFee);

      value = mintFee;
      const { hash } = await contract["setScore"](
        signature,
        mintedScore,
        calculationModel,
        deadline,
        metadataUrl,
        chainId,
        referralCode,
        referrerCode,
        { value }
      );
      // isDebug && console.log("got hash: ", hash);

      event("minted_score", {
        chain: "zksync",
        address,
      });

      setMintData({ isWhitelisted, trx: { hash } });
      setMintIsLoading(false);

      return;
    } catch (err) {
      const readableErr = readableError(err);
      setMintError(readableErr);
      setMintIsLoading(false);
    }
  };

  return {
    referral,
    token,
    mint,
    getReferralData,
    getToken,
    mintToken,
    claimReward,
    claim,
  };
};
