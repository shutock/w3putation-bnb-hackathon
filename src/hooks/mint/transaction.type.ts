import type { Address } from "wagmi";

export type ITransaction = {
  hash: `0x${string}`;
  type: number;
  accessList: unknown;
  blockHash: `0x${string}`;
  blockNumber: number;
  transactionIndex: number;
  confirmations: number;
  from: Address;
  gasPrice: {
    type: "BigNumber";
    hex: `0x${string}`;
  };
  gasLimit: {
    type: "BigNumber";
    hex: `0x${string}`;
  };
  to: Address;
  value: {
    type: "BigNumber";
    hex: `0x${string}`;
  };
  nonce: number;
  data: `0x${string}`;
  r: `0x${string}`;
  s: `0x${string}`;
  v: number;
  creates: unknown;
  chainId: number;
};
