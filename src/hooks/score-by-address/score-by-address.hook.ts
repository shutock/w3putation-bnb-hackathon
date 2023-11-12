/** HARDCODED */

import { useProvider } from "wagmi";
import { ethers } from "ethers";

import { abi } from "../score/abi";

import type { IResponse, IToken } from "./response.type";
import { useScoreByAddressStore } from "./score-by-address.store";

const contractAddress = "0xAbe08390C1d5c7FdB6fc6F17EEd6c8CfC193A259";

export const useScoreByAddress = () => {
  const { data, error, isLoading, setData, setError, setIsLoading } =
    useScoreByAddressStore((state) => state);

  const provider = useProvider();
  const contract = new ethers.Contract(contractAddress, abi, provider);

  const getToken = async (address: string) => {
    try {
      const { chainId, tokenId, updated, ...params } = (await contract[
        "getScore"
      ](address, 324, 4)) as IToken<ethers.BigNumber>;
      const formattedToken: IToken<number> = {
        ...params,
        chainId: chainId.toNumber(),
        tokenId: tokenId.toNumber(),
        updated: updated.toNumber(),
      };

      return formattedToken;
    } catch (err) {
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
      setError(err.message);
      setIsLoading(false);
    }
  };

  const getData = async (address: string) => {
    try {
      setData(null);
      setIsLoading(true);
      const token = await getToken(address);
      if (token.score === 0) {
        setIsLoading(false);
        return;
      }
      const tokenUri = await getTokenUri(token.tokenId);
      setData({ ...tokenUri, ...token });
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, getData };
};
