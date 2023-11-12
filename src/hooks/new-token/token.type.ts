export type IToken<T> = {
  calculationModel: number;
  chainId: T;
  owner: string;
  score: number;
  tokenId: T;
  updated: T;
};

export type IResponse = {
  attributes: { trait_type: string; value: number | string }[];
  description: string;
  external_url: string;
  image: string;
  name: string;
};
