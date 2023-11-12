import { opBNB } from "@/lib";
import { abi } from "./abi";
import { ethers } from "ethers";

const address = "0xC388Fae5C90E0Fb95CA1E76674A3439db07A6579";

type Params = {
  signer?: ethers.Signer;
};

const provider = new ethers.providers.JsonRpcProvider(
  opBNB.rpcUrls.default.http[0]
);

export const contract = (params?: Params) =>
  new ethers.Contract(address, abi, params?.signer || provider);
