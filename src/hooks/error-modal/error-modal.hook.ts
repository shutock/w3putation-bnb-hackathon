import React from "react";

import { useFormModalStore } from "./error-modal.store";

export const useErrorModal = () => {
  const { isShow, setIsShow, isVisible, setIsVisible } = useFormModalStore(
    (state) => state
  );

  const open = () => {
    setIsShow(true);
    setTimeout(() => setIsVisible(true), 1);
  };

  const close = () => {
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

  return { isShow, isVisible, close, open };
};
