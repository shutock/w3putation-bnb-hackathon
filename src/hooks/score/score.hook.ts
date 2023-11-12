/** HARDCODED */

import { ethers } from "ethers";
import { useAccount, useProvider, useSigner } from "wagmi";

import { useScoreStore } from "./score.store";
import { abi } from "./abi";
import { useSearchParams } from "next/navigation";
import { readableError } from "@/lib";
import { useSignMessage } from "@/hooks";
import { event } from "nextjs-google-analytics";

const contractAddress = "0xC388Fae5C90E0Fb95CA1E76674A3439db07A6579";

export const useScore = () => {
  const { address: account } = useAccount();

  const setData = useScoreStore((state) => state.setData);
  const data = useScoreStore((state) => state.data);
  const setNonce = useScoreStore((state) => state.setNonce);
  const _nonce = useScoreStore((state) => state.nonce);
  const setDeadline = useScoreStore((state) => state.setDeadline);
  const setError = useScoreStore((state) => state.setError);
  const error = useScoreStore((state) => state.error);
  const setIsLoading = useScoreStore((state) => state.setIsLoading);
  const isLoading = useScoreStore((state) => state.isLoading);
  const setReferral = useScoreStore((state) => state.setReferral);

  const searchParams = useSearchParams();
  const ref = searchParams.get("ref");

  const provider = useProvider();

  const { sign } = useSignMessage();
  const { data: signer } = useSigner();

  const fetchData = async () => {
    try {
      setData(null);
      //@ts-ignore
      setError(null);

      event("get_score", {
        chain: "zksync",
        account,
      });

      if (!signer) throw new Error("You need to connect first");

      //@ts-ignore
      const { hash, message } = await sign();

      setIsLoading(true);

      const nonceValue = await getNonce();

      const minute = 60 * 1000;
      const hour = minute * 60;

      const deadlineValue = Math.floor(
        (new Date().getTime() + hour * 24) / 1000
      );
      setDeadline(deadlineValue);

      const url =
        `zksyncera/wallet/${account}/score?scoreType=${2}&calculationModel=${10}&UseTokenLists=${false}&nonce=${nonceValue}&deadline=${deadlineValue}&GetCyberConnectProtocolData=${false}&prepareToMint=true&MintChain=${0}${
          ref ? `&ReferrerCode=${ref}` : ""
        }`.replaceAll("&", ":AMP:");

      const response = await fetch(
        `/api/get-score?address=${account}&message=${message}&hash=${hash}&url=${url}`
      );

      const json = await response.json();

      const { data: newData, succeeded, messages } = json;

      if (!succeeded) throw new Error(messages.join(":NEWLINE:"));

      event("getted_score", {
        chain: "zksync",
        account,
      });

      setData(newData);
      setIsLoading(false);
    } catch (err) {
      const readableErr = readableError(err);
      setError(readableErr.split(":NEWLINE:"));
      setIsLoading(false);
    }
  };

  const getNonce = async () => {
    const contract = new ethers.Contract(contractAddress, abi, provider);

    try {
      if (!account) return;

      const bigNumber = await contract["getNonce"](account);
      const number = bigNumber.toNumber();
      setNonce(number);

      return number;
    } catch (err) {
      //@ts-ignore
      setError(err.message);
      setIsLoading(false);
      return null;
    }
  };

  const getScore = () => {
    fetchData();
  };

  return { getScore, data, isLoading, error, setReferral };
};
