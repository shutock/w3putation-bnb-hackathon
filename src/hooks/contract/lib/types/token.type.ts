export type ITokenResponse = {
  attributes: { trait_type: string; value: number | string }[];
  description: string;
  external_url: string;
  image: string;
  name: string;
};

export type ITokenRaw<T> = {
  calculationModel: number;
  chainId: T;
  owner: string;
  score: number;
  tokenId: T;
  updated: T;
};

export type IToken = {
  calculationModel: number;
  chainId: number;
  owner: string;
  score: number;
  tokenId: number;
  updated: number;
  name: string;
  description: string;
  image: string;
  attributes: { trait_type: string; value: number | string }[];
};
