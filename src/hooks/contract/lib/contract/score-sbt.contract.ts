import { ethers } from "ethers";

import { abi } from "./abi";

type GetContract = (props: {
  signer?: ethers.Signer | null;
  rpc?: string;
  address: string;
}) => ethers.Contract;

//@ts-ignore
export const getContract: GetContract = ({ signer, rpc, address }) => {
  if (!signer && !rpc) return null;

  const provider = !rpc ? null : new ethers.providers.JsonRpcProvider(rpc);

  const signerOrProvider = signer ?? provider;

  const contract = new ethers.Contract(address, abi, signerOrProvider!);

  return contract!;
};
