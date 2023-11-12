import { create } from "zustand";
import { IResponse, IToken } from "./response.type";

type Data = IResponse & IToken<number>;

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
  setData: (data: Data) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string) => void;
};

export const useScoreByAddressStore = create<State & Actions>()((set) => ({
  ...initialState,

  setData: (data) => set(() => ({ data })),
  setIsLoading: (isLoading) => set(() => ({ isLoading })),
  setError: (error) => set(() => ({ error })),
}));
