import { create } from "zustand";

type State = {
  isShow: boolean;
  isVisible: boolean;
};

const initialState: State = {
  isShow: false,
  isVisible: false,
};

type Actions = {
  setIsShow: (isShow: boolean) => void;
  setIsVisible: (isVisible: boolean) => void;
};

export const useFormModalStore = create<State & Actions>()((set) => ({
  ...initialState,

  setIsShow: (isShow) => set(() => ({ isShow })),
  setIsVisible: (isVisible) => set(() => ({ isVisible })),
}));
