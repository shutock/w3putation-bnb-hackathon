import { create } from "zustand";

type Token = {
  usd: number;
  isLoading: boolean;
  error: string | null;
};

type State = {
  tokens: Map<string, Token>;
};

const initialState = {
  tokens: new Map(),
};

type Actions = {
  setTokenData: (props: {
    symbol: string;
    data: { usd?: number; isLoading?: boolean; error?: string };
  }) => void;
};

export const useTokenPriceStore = create<State & Actions>()((set) => ({
  ...initialState,
  setTokenData: ({ symbol, data }) =>
    set(({ tokens }) => {
      const _usd = data.usd ?? tokens.get(symbol)?.usd ?? null;
      const _isLoading =
        data.isLoading ?? tokens.get(symbol)?.isLoading ?? false;
      const _error = data.error ?? tokens.get(symbol)?.error ?? null;

      const token = { usd: _usd, isLoading: _isLoading, error: _error };
      const newTokens = tokens;

      newTokens.set(symbol, token);

      return { tokens: newTokens };
    }),
}));
