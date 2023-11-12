import { Address } from "wagmi";

export const shortAddress = (address: Address) => {
  const lcAddress = address?.toLowerCase();

  return ["0x", lcAddress?.slice(2, 6), lcAddress?.slice(-4)];
};
