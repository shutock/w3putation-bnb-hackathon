import React from "react";
import { useConnect } from "./connect";
import { usePolygonIdStore } from "./polygon-id.store";
import { useClaim } from "./claim";

export const usePolygonId = () => {
  const {
    did,
    isAdding,
    setDid,
    setIsAdding,
    isShow,
    isVisible,
    setIsShow,
    setIsVisible,
  } = usePolygonIdStore((state) => state);

  const { data: claimQr } = useClaim();

  const con = useConnect();

  const id = con?.user?.body?.did_doc?.id;

  React.useEffect(() => {
    if (!id) return;
    setDid(id);
  }, [id]);

  const open = () => {
    setIsShow(true);
    setTimeout(() => setIsVisible(true), 1);
  };

  const close = () => {
    setIsVisible(false);
    setTimeout(() => setIsShow(false), 400);
  };

  return {
    did,
    isAdding,
    setIsAdding,
    open,
    close,
    isShow,
    isVisible,
    claimQr,
    ...con,
  };
};
