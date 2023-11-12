import { create } from "zustand";
import { IData } from "./score.type";

type State = {
  deadline: number | null;
  nonce: number | null;
  data: IData | null;
  isLoading: boolean;
  error: string[] | null;
  referral: string | null;
};

const initialState: State = {
  deadline: null,
  nonce: null,
  data: null,
  isLoading: false,
  error: null,
  referral: null,
};

type Actions = {
  setDeadline: (deadline: number) => void;
  setNonce: (nonce: number) => void;
  setData: (data: any) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string[]) => void;
  setReferral: (referral: string) => void;
};

export const useScoreStore = create<State & Actions>()((set) => ({
  ...initialState,

  setDeadline: (deadline) => set(() => ({ deadline })),
  setNonce: (nonce) => set(() => ({ nonce })),
  setData: (data) => set(() => ({ data })),
  setIsLoading: (isLoading) => set(() => ({ isLoading })),
  setError: (error) => set(() => ({ error })),
  setReferral: (referral) => set(() => ({ referral })),
}));
