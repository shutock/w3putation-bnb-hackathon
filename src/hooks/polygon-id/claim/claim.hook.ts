import React from "react";
import { useScore } from "../../score";

type Data = {};

export const useClaim = () => {
  const [data, setData] = React.useState<Data | null>(null);

  const { data: scoreData } = useScore();

  React.useEffect(() => {
    if (!scoreData) return;

    const claimQR = scoreData?.didData?.claimQR;
    if (!claimQR) return;

    setData(claimQR);
  }, [scoreData]);

  return { data };
};
