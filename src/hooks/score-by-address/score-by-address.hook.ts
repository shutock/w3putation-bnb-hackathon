/** HARDCODED */

import { useProvider } from "wagmi";
import { ethers } from "ethers";

import { abi } from "../score/abi";

import type { IResponse, IToken } from "./response.type";
import { useScoreByAddressStore } from "./score-by-address.store";
import { opBNB } from "@/lib";

const contractAddress = "0xC388Fae5C90E0Fb95CA1E76674A3439db07A6579";

export const useScoreByAddress = () => {
  const { data, error, isLoading, setData, setError, setIsLoading } =
    useScoreByAddressStore((state) => state);

  const provider = useProvider();
  const contract = new ethers.Contract(contractAddress, abi, provider);

  const getToken = async (address: string) => {
    try {
      const { chainId, tokenId, updated, ...params } = (await contract[
        "getScore"
      ](address, opBNB.id, 11)) as IToken<ethers.BigNumber>;
      const formattedToken: IToken<number> = {
        ...params,
        chainId: chainId.toNumber(),
        tokenId: tokenId.toNumber(),
        updated: updated.toNumber(),
      };

      return formattedToken;
    } catch (err) {
      //@ts-ignore
      setError(err.message);
      setIsLoading(false);
    }
  };

  const getTokenUri = async (tokenId: number) => {
    try {
      const tokenUri = await contract["tokenURI"](tokenId);
      const response = (await (await fetch(tokenUri)).json()) as IResponse;
      return response;
    } catch (err) {
      //@ts-ignore
      setError(err.message);
      setIsLoading(false);
    }
  };

  const getData = async (address: string) => {
    try {
      //@ts-ignore
      setData(null);
      setIsLoading(true);
      const token = await getToken(address);
      //@ts-ignore
      if (token.score === 0) {
        setIsLoading(false);
        return;
      }
      //@ts-ignore
      const tokenUri = await getTokenUri(token.tokenId);
      //@ts-ignore
      setData({ ...tokenUri, ...token });
      setIsLoading(false);
    } catch (err) {
      //@ts-ignore
      setError(err.message);
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, getData };
};
