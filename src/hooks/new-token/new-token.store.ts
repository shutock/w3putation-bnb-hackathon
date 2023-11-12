import type { IResponse, IToken } from "./token.type";

import { create } from "zustand";

type Data = IToken<number> & IResponse;

type State = {
  data: Data | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: State = {
  data: null,
  isLoading: false,
  error: null,
};

type Actions = {
  setData: (data: Data | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
};

export const useNewTokenStore = create<State & Actions>()((set) => ({
  ...initialState,

  setData: (data) => set(() => ({ data })),
  setIsLoading: (isLoading) => set(() => ({ isLoading })),
  setError: (error) => set(() => ({ error })),
}));
