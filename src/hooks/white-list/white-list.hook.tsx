import React from "react";
import { ethers } from "ethers";

import { zkSync } from "wagmi/chains";

import { abi } from "./abi";

import { type Address } from "wagmi";
import { getContract } from "../contract";

type Props = { address: Address };

const contractAddress = "0xAbe08390C1d5c7FdB6fc6F17EEd6c8CfC193A259";

export const useWhitelist = ({ address }: Props) => {
  const [data, setData] = React.useState<boolean | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const getIsWhitelisted = async () => {
    try {
      const contract = getContract({
        address: contractAddress,
        rpc: zkSync.rpcUrls.default.http[0],
      });
      setError(null);
      setIsLoading(true);

      const response = (await contract["whitelist"](address, 10)) as boolean;
      setData(response);
      setIsLoading(false);
      return response;
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return { isWhitelisted: data, error, isLoading, getIsWhitelisted };
};
