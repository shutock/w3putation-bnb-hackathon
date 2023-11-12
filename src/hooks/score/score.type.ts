export type IData = {
  address: string;
  score: number;
  scoreType: number;
  didData: DidData;
  migrationData: {
    blockNumber: string;
    tokenId: string;
    signature: string;
    deadline: number;
    address: string;
    referralCode: string;
    referrerCode: string;
  };
  mintData: {
    signature: string;
    mintedScore: number;
    calculationModel: number;
    deadline: number;
    metadataUrl: string;
    chainId: number;
    referralCode: string;
    referrerCode: string;
    mintedChain: {
      isEnabled: boolean;
      chainId: number;
      hexChainId: string;
      chainName: string;
      blockchainName: string;
      blockchainSlug: string;
      blockExplorerUrls: string[];
      rpcUrls: string[];
      isEVMCompatible: boolean;
      sbtData: {
        Finance: {
          contractAddress: string;
          tokenName: string;
          version: string;
        };
      };
    };
  };
  referralCode: string;
  stats: {
    // chainStats: {
    //   BSC: Stats;
    //   Ethereum: Stats;
    //   Polygon: Stats;
    // };
    noData: boolean;
    nativeBalance: number;
    nativeBalanceUSD: number;
    holdTokensBalanceUSD: number;
    walletTurnover: number;
    walletTurnoverUSD: number;
    balanceChangeInLastMonth: number;
    balanceChangeInLastYear: number;
    walletAge: number;
    totalTransactions: number;
    totalRejectedTransactions: number;
    averageTransactionTime: number;
    maxTransactionTime: number;
    minTransactionTime: number;
    timeFromLastTransaction: number;
    lastMonthTransactions: number;
    lastYearTransactions: number;
    transactionsPerMonth: number;
    tokensHolding: number;
    nativeToken: string;
    nftHolding: number;
    nftTrading: number;
    nftWorth: number;
    turnoverIntervals: {
      startDate: string;
      endDate: string;
      amountSumValue: number;
      amountOutSumValue: number;
      amountInSumValue: number;
      count: number;
    }[];
    statsDescriptions: {
      [key: string]: {
        label: string;
        description: string;
        units: string;
      };
    };
  };
};

type Stats = {
  noData: boolean;
  nativeBalance: number;
  nativeBalanceUSD: number;
  holdTokensBalanceUSD: number;
  walletTurnover: number;
  walletTurnoverUSD: number;
  balanceChangeInLastMonth: number;
  balanceChangeInLastYear: number;
  walletAge: number;
  totalTransactions: number;
  totalRejectedTransactions: number;
  averageTransactionTime: number;
  maxTransactionTime: number;
  minTransactionTime: number;
  timeFromLastTransaction: number;
  lastMonthTransactions: number;
  lastYearTransactions: number;
  transactionsPerMonth: number;
  tokensHolding: number;
  nativeToken: string;
  nftHolding: number;
  nftTrading: number;
  nftWorth: number;
  turnoverIntervals: {
    startDate: string;
    endDate: string;
    amountSumValue: number;
    amountOutSumValue: number;
    amountInSumValue: number;
    count: number;
  }[];
  statsDescriptions: {
    [key: string]: {
      label: string;
      description: string;
      units: string;
    };
  };
};

type DidData = {
  claimQR: string;
  createdClaimId: string;
  did: string;
};
