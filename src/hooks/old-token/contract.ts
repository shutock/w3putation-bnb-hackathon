import { abi } from "./abi";
import { ethers } from "ethers";
import { zkSync } from "wagmi/chains";

const address = "0x00Ba30361E6e0E15da8a0595464bF38E4102797a";

type Params = {
  signer?: ethers.Signer;
};

const provider = new ethers.providers.JsonRpcProvider(
  zkSync.rpcUrls.default.http[0]
);

export const contract = (params?: Params) =>
  new ethers.Contract(address, abi, params?.signer || provider);
