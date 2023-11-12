import { create } from "zustand";

type IState = { isVerified: boolean; isLoading: boolean };

const initialState: IState = {
  isLoading: true,
  isVerified: process.env.NODE_ENV === "development" ? true : false,
};

type IActions = {
  setIsVerified: (isVerified: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
};

export const useRecaptcha = create<IState & IActions>()((set) => ({
  ...initialState,

  setIsVerified: (isVerified) => set(() => ({ isVerified })),
  setIsLoading: (isLoading) => set(() => ({ isLoading })),
}));
