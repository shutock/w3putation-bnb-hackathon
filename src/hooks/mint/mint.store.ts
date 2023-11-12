import { create } from "zustand";

type State = {
  isLoading: boolean;
  trxHash: string | null;
  error: string | null;
};

const initialState: State = {
  isLoading: false,
  trxHash: null,
  error: null,
};

type Actions = {
  setIsLoading: (isLoading: boolean) => void;
  setTrxHash: (trxHash: string) => void;
  setError: (error: string) => void;
};

export const useMintStore = create<State & Actions>()((set) => ({
  ...initialState,

  setIsLoading: (isLoading) => set(() => ({ isLoading })),
  setTrxHash: (trxHash) => set(() => ({ trxHash })),
  setError: (error) => set(() => ({ error })),
}));
