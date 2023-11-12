import React from "react";

import { opBNB } from "@/lib";

import { type Address } from "wagmi";
import { getContract } from "../contract";

type Props = { address: Address };

const contractAddress = "0xC388Fae5C90E0Fb95CA1E76674A3439db07A6579";

export const useWhitelist = ({ address }: Props) => {
  const [data, setData] = React.useState<boolean | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const getIsWhitelisted = async () => {
    try {
      const contract = getContract({
        address: contractAddress,
        rpc: opBNB.rpcUrls.default.http[0],
      });
      setError(null);
      setIsLoading(true);

      const response = (await contract["whitelist"](address, 11)) as boolean;
      setData(response);
      setIsLoading(false);
      return response;
    } catch (err) {
      // @ts-ignore
      setError(err.message);
      setIsLoading(false);
    }
  };

  return { isWhitelisted: data, error, isLoading, getIsWhitelisted };
};
