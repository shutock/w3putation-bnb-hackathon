import { zkSync } from "wagmi/chains";
import { abi } from "./abi";
import { ethers } from "ethers";

const address = "0xAbe08390C1d5c7FdB6fc6F17EEd6c8CfC193A259";

type Params = {
  signer?: ethers.Signer;
};

const provider = new ethers.providers.JsonRpcProvider(
  zkSync.rpcUrls.default.http[0]
);

export const contract = (params?: Params) =>
  new ethers.Contract(address, abi, params?.signer || provider);
