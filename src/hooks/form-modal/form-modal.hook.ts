import React from "react";

import { useFormModalStore } from "./form-modal.store";

const storeAttr = "form-modal";
const storeType = "sessionStorage";

export const useFormModal = () => {
  const { isShow, setIsShow, isVisible, setIsVisible } = useFormModalStore(
    (state) => state
  );

  const open = () => {
    window[storeType].removeItem(storeAttr);
    setIsShow(true);
    setTimeout(() => setIsVisible(true), 1);
  };

  const close = () => {
    window[storeType].setItem(storeAttr, "closed");
    setIsVisible(false);
    setTimeout(() => setIsShow(false), 400);
  };

  /** remove scroll when modal is open */
  React.useEffect(() => {
    if (isShow) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isShow]);

  /** close modal on Escape key */
  React.useEffect(() => {
    if (!isShow) return;

    const handle = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;

      e.preventDefault();

      close();
    };

    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [isShow]);

  return { isShow, isVisible, close, open, storeType, storeAttr };
};
