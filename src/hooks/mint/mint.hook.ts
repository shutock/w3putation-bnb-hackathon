/** HARDCODED */

import {
  Address,
  useAccount,
  useNetwork,
  useSigner,
  useSwitchNetwork,
} from "wagmi";
import { useScoreStore } from "../score";

import { abi } from "../new-token/abi";
import { ethers } from "ethers";
import { useMintStore } from "./mint.store";
import { ITransaction } from "./transaction.type";
import { opBNB } from "@/lib";
import { useFormModal } from "../form-modal";
import React from "react";
import { useWhitelist } from "../white-list";

const address = "0xAbe08390C1d5c7FdB6fc6F17EEd6c8CfC193A259";

export const useMint = () => {
  const setIsLoading = useMintStore((state) => state.setIsLoading);
  const isLoading = useMintStore((state) => state.isLoading);
  const setTrxHash = useMintStore((state) => state.setTrxHash);
  const trxHash = useMintStore((state) => state.trxHash);
  const setError = useMintStore((state) => state.setError);
  const error = useMintStore((state) => state.error);

  const { address: account } = useAccount();
  const { getIsWhitelisted } = useWhitelist({ address: account! });

  const { open, storeAttr, storeType } = useFormModal();

  /** open modal when user remove focus from page */
  React.useEffect(() => {
    if (!trxHash) return;

    const handler = () => {
      //@ts-ignore
      if (window[storeType].getItem(storeAttr)) return;
      open();
    };

    window.addEventListener("blur", handler);

    return () => {
      window.removeEventListener("blur", handler);
    };
  }, [trxHash]);

  const { chain } = useNetwork();
  //@ts-ignore
  const { switchNetworkAsync } = useSwitchNetwork({ chainId: zkSync.id });

  const { data: signer } = useSigner();

  const data = useScoreStore((state) => state.data);
  const deadline = useScoreStore((state) => state.deadline);
  const referrerCode = useScoreStore((state) => state.referral);

  const mint = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setTrxHash(null);

      const isWhitelisted = await getIsWhitelisted();

      if (chain?.id !== zkSync.id) await switchNetworkAsync();

      const {
        mintData: {
          signature,
          mintedScore,
          calculationModel,
          metadataUrl,
          chainId,
        },
      } = data;

      const contract = new ethers.Contract(address, abi, signer);

      const referralCode = (await contract.getReferralCode(address)) || "";

      const trx: ITransaction = await contract.setScore(
        signature,
        mintedScore,
        calculationModel,
        deadline,
        metadataUrl,
        chainId,
        referralCode,
        referrerCode,
        {
          value: isWhitelisted
            ? ethers.utils.parseEther("0")
            : ethers.utils.parseEther("10"),
          gasLimit: 500000,
        }
      );

      setTrxHash(trx.hash);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);

      if (err.message.toLowerCase().includes("rejected")) return;

      if (err.data?.message) {
        setError(err.data.message);
      } else {
        setError(err.message);
      }
    }
  };

  return { mint, trxHash, isLoading, error };
};
