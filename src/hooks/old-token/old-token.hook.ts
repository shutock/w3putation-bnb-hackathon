import { IResponse, IToken } from "./token.type";

import { ethers } from "ethers";
import { contract as getContract } from "./contract";
import { useOldTokenStore } from "./old-token.store";

export const useOldToken = () => {
  const { data, error, isLoading, setData, setError, setIsLoading } =
    useOldTokenStore((state) => state);

  const contract = getContract();

  const getToken = async (address: string) => {
    try {
      const tokenData = (await contract["getScore"](
        address,
        324,
        10
      )) as IToken<ethers.BigNumber>;

      const { chainId, tokenId, updated, ...params } = tokenData;
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
      setData(null);
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
      setData(null);
    }
  };

  const getData = async (address: string) => {
    try {
      setIsLoading(true);
      setError(null);

      if (!address) throw new Error("You need to connect first");

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
      setData(null);
    }
  };

  return { data, isLoading, error, getData };
};
