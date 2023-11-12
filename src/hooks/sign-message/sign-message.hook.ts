import { useSignMessage as useSign, useSigner } from "wagmi";
import { useSignMessageStore } from "./sign-message.store";
import React from "react";

export const useSignMessage = () => {
  const {
    hash,
    isSigning,
    message,
    error,
    setHash,
    setIsSigning,
    setMessage,
    setError,
  } = useSignMessageStore((state) => state);

  const { signMessageAsync } = useSign();

  const { data: signer } = useSigner();

  const sign = async () => {
    if (isSigning) return;
    if (message && hash) return { message, hash };

    try {
      setIsSigning(true);
      //@ts-ignore
      setError(null);
      const message =
        "Sign this message to get your Score. Nonce: " + randomHash();
      const hash = await signMessageAsync({ message });
      setMessage(message);
      setHash(hash);
      setIsSigning(false);
      return { hash, message };
    } catch (err) {
      const { message } = err as { message: string };
      setError(message);
      setIsSigning(false);
    }
  };

  React.useEffect(() => {
    if (!signer) return;

    setIsSigning(false);
    // @ts-ignore
    setError(null);
    // @ts-ignore
    setMessage(null);
    // @ts-ignore
    setHash(null);
  }, [signer]);

  return {
    hash,
    isSigning,
    error,
    sign,
    message,
  };
};

const randomHash = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};
