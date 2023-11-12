import { create } from "zustand";

import type { Address } from "wagmi";
import type { IToken } from "./lib/types";

type State = {
  token: {
    data: IToken | null;
    isLoading: boolean | null;
    error: string | null;
  };

  referral: {
    referrals: Address[] | null;
    claimableReward: number | string | null;
    rewardPerReferral: number | string | null;
    isLoading: boolean | null;
    error: string | null;
    code: string | null;
  };

  mint: {
    isWhitelisted: boolean | null;
    isLoading: boolean;
    error: string | null;
    trx: {
      hash: Address | null;
      status: "pending" | "success" | "error" | null;
    };
  };

  claimReward: {
    isLoading: boolean;
    error: string | null;
    trx: {
      hash: Address | null;
      status: "pending" | "success" | "error" | null;
    };
  };
};

const initialState: State = {
  token: {
    data: null,
    isLoading: false,
    error: null,
  },

  referral: {
    referrals: null,
    claimableReward: null,
    rewardPerReferral: null,
    isLoading: false,
    error: null,
    code: null,
  },

  mint: {
    isWhitelisted: null,
    isLoading: false,
    error: null,
    trx: {
      hash: null,
      status: null,
    },
  },

  claimReward: {
    isLoading: false,
    error: null,
    trx: {
      hash: null,
      status: null,
    },
  },
};

type Actions = {
  setTokenData: (props: Omit<State["token"], "isLoading" | "error">) => void;
  setTokenIsLoading: (isLoading: boolean) => void;
  setTokenError: (error: string | null) => void;

  setReferralData: (
    props: Omit<State["referral"], "isLoading" | "error">
  ) => void;
  setReferralIsLoading: (isLoading: boolean) => void;
  setReferralError: (error: string | null) => void;

  setMintData: (
    props: Omit<State["mint"], "isLoading" | "error" | "trx"> & {
      trx: { hash: Address };
    }
  ) => void;
  setMintIsLoading: (isLoading: boolean) => void;
  setMintError: (error: string | null) => void;
  setTrxStatus: (status: State["mint"]["trx"]["status"]) => void;

  setClaimRewardData: (
    props: Omit<State["claimReward"], "isLoading" | "error" | "trx"> & {
      trx: { hash: Address };
    }
  ) => void;
  setClaimRewardIsLoading: (isLoading: boolean) => void;
  setClaimRewardError: (error: string | null) => void;
  setClaimRewardTrxStatus: (
    status: State["claimReward"]["trx"]["status"]
  ) => void;
};

export const useContractStore = create<State & Actions>()((set) => ({
  ...initialState,

  setTokenData: (props) =>
    set((state) => ({
      token: {
        ...props,
        isLoading: state.token.isLoading,
        error: state.token.error,
      },
    })),

  setTokenIsLoading: (isLoading) =>
    set((state) => {
      const { isLoading: isLoading_old, ...rest } = state.token;
      return { token: { isLoading, ...rest } };
    }),

  setTokenError: (error) =>
    set((state) => {
      const { error: error_old, ...rest } = state.token;
      return { token: { error, ...rest } };
    }),

  setReferralData: (props) =>
    set((state) => {
      const { isLoading, error } = state.referral;
      return {
        referral: {
          ...props,
          isLoading,
          error,
        },
      };
    }),

  setReferralIsLoading: (isLoading) =>
    set((state) => {
      const { isLoading: isLoading_old, ...rest } = state.referral;
      return { referral: { isLoading, ...rest } };
    }),

  setReferralError: (error) =>
    set((state) => {
      const { error: error_old, ...rest } = state.referral;
      return { referral: { error, ...rest } };
    }),

  setMintData: ({ trx, ...props }) =>
    set((state) => {
      const {
        isLoading,
        error,
        trx: { status },
      } = state.mint;
      return {
        mint: {
          ...props,
          trx: {
            hash: trx.hash,
            status,
          },
          isLoading,
          error,
        },
      };
    }),

  setMintIsLoading: (isLoading) =>
    set((state) => {
      const { isLoading: isLoading_old, ...rest } = state.mint;
      return { mint: { isLoading, ...rest } };
    }),

  setMintError: (error) =>
    set((state) => {
      const { error: error_old, ...rest } = state.mint;
      return { mint: { error, ...rest } };
    }),

  setTrxStatus: (status) =>
    set((state) => {
      const {
        trx: { status: status_old, hash },
        ...rest
      } = state.mint;
      return { mint: { trx: { status, hash }, ...rest } };
    }),

  setClaimRewardData: ({ trx }) =>
    set((state) => {
      const {
        isLoading,
        error,
        trx: { status },
      } = state.claimReward;
      return {
        claimReward: {
          trx: {
            hash: trx.hash,
            status,
          },
          isLoading,
          error,
        },
      };
    }),

  setClaimRewardIsLoading: (isLoading) =>
    set((state) => {
      const { isLoading: isLoading_old, ...rest } = state.claimReward;
      return { claimReward: { isLoading, ...rest } };
    }),

  setClaimRewardError: (error) =>
    set((state) => {
      const { error: error_old, ...rest } = state.claimReward;
      return { claimReward: { error, ...rest } };
    }),

  setClaimRewardTrxStatus: (status) =>
    set((state) => {
      const {
        trx: { status: status_old, hash },
        ...rest
      } = state.claimReward;
      return { claimReward: { trx: { status, hash }, ...rest } };
    }),
}));
