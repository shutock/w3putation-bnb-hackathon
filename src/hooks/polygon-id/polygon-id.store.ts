import { create } from "zustand";

type State = {
  did: string | null;
  isAdding: boolean | null;
  isShow: boolean;
  isVisible: boolean;
};

const initialState: State = {
  did: null,
  isAdding: null,
  isShow: false,
  isVisible: false,
};

type Actions = {
  setDid: (did: string) => void;
  setIsAdding: (isAdding: boolean) => void;
  setIsShow: (isShow: boolean) => void;
  setIsVisible: (isVisible: boolean) => void;
};

export const usePolygonIdStore = create<State & Actions>()((set) => ({
  ...initialState,

  setDid: (did) => set(() => ({ did })),
  setIsAdding: (isAdding) => set(() => ({ isAdding })),
  setIsShow: (isShow) => set(() => ({ isShow })),
  setIsVisible: (isVisible) => set(() => ({ isVisible })),
}));
