import { useAccount } from "wagmi";
import {
  useContract,
  useRecaptcha,
  useScore,
  useScoreStore,
} from "../../hooks";
import styles from "./data.module.scss";
import { Highlights } from "./highlights";
import React from "react";
import { WhatIs } from "./what-is";
import { Stats } from "./stats";
import { Loader } from "../../components";
// import { usePolygonId } from "../../hooks/polygon-id";
import classNames from "classnames";

export const Data: React.FC = () => {
  const [isMounted, setIsMounted] = React.useState(false);
  React.useEffect(() => setIsMounted(true), []);
  const { isVerified } = useRecaptcha();

  const { data, error, isLoading, getScore } = useScore();
  const setData = useScoreStore((state) => state.setData);

  const { address } = useAccount();
  // const { isAdding, did } = usePolygonId();

  // React.useEffect(() => {
  //   if (!address) return;
  //   if (!isVerified) return;
  //   // if (isAdding === null) return;

  //   // if (!isAdding) getScore();

  //   // if (isAdding && did) getScore();
  //   getScore();
  // }, [address, isVerified]);

  React.useEffect(() => {
    setData(null);
  }, [address]);

  // if (!isMounted || !address || isAdding === null)
  if (!isMounted || !address)
    return (
      <div className={styles.section}>
        <WhatIs />
      </div>
    );

  if (isLoading)
    return (
      <div className={styles.section}>
        <div className={styles.loading}>
          <Loader />
        </div>
      </div>
    );

  if (error)
    return (
      <div className={classNames(styles.section, styles.error)}>
        {Array.isArray(error) ? (
          error.map((err, id) => {
            return <p key={err + id}>{err}</p>;
          })
        ) : (
          <p>{error}</p>
        )}
      </div>
    );

  if (!data)
    return (
      <div className={styles.section}>
        <WhatIs />
      </div>
    );

  return (
    <div className={styles.section}>
      <Highlights />
      <Stats />
    </div>
  );
};
