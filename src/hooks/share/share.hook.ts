import React from "react";
import { readableError } from "../../lib";

type Props = {
  title?: string;
  text?: string;
  url?: string;
};

export const useShare = () => {
  const [canShare, setCanShare] = React.useState(false);
  const [shared, setShared] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    setCanShare(
      navigator.canShare && navigator.canShare({ url: "", text: "", title: "" })
    );
    !navigator.canShare && setError("Your browser doesn't support sharing...");
  }, [navigator]);

  const share = async (shareData: Props) => {
    try {
      setError(null);
      setShared(false);

      await navigator.share(shareData);

      setShared(true);
    } catch (err) {
      const readableErr = readableError(err);
      setError(readableErr);
    }
  };
  return { canShare, share, error };
};
