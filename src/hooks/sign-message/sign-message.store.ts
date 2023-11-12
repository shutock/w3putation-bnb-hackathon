import { create } from "zustand";

type State = {
  message: string | null;
  hash: string | null;
  isSigning: boolean;
  error: string | null;
};

const initialState: State = {
  message: null,
  hash: null,
  isSigning: false,
  error: null,
};

type Actions = {
  setMessage: (message: string) => void;
  setHash: (hash: string) => void;
  setIsSigning: (isSigning: boolean) => void;
  setError: (error: string) => void;
};

export const useSignMessageStore = create<State & Actions>((set) => ({
  ...initialState,

  setMessage: (message) => set({ message }),
  setHash: (hash) => set({ hash }),
  setIsSigning: (isSigning) => set({ isSigning }),
  setError: (error) => set({ error }),
}));
