import React from "react";

import { useProvider } from "wagmi";
import { zkSync } from "wagmi/chains";

type Status = "pending" | "failed" | "success";

const isDebug = false;

export const useTrxStatus = (hash?: string | null) => {
  const [status, setStatus] = React.useState<Status | null>(null);

  const provider = useProvider({ chainId: zkSync.id });

  React.useEffect(() => {
    if (!hash) return;

    let stop = false;

    const getStatus = async () => {
      try {
        const receipt = await provider.getTransactionReceipt(hash);

        // isDebug && console.log("checking status", receipt);

        if (!receipt) {
          setStatus("pending");
          return;
        }

        if (receipt.status === 1) {
          setStatus("success");
          stop = true;
          return;
        }

        setStatus("failed");
        stop = true;
      } catch (error) {
        setStatus(null);
      }
    };

    const intervalId = setInterval(async () => {
      if (!stop) await getStatus();
    }, 2000);

    return () => clearInterval(intervalId);
  }, [hash, status]);

  return { status };
};
