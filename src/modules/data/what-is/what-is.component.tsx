import { useAccount } from "wagmi";
import styles from "./what-is.module.scss";
import { useScore } from "../../../hooks";
import React from "react";

export const WhatIs: React.FC = () => {
  const [isMounted, setIsMounted] = React.useState(false);
  React.useEffect(() => setIsMounted(true), []);

  const { isConnected } = useAccount();
  const { getScore } = useScore();

  return (
    <div className={styles.section}>
      <div className={styles.hero}>
        <h1 className={styles.title}>
          <span className={styles.line}>
            <span className={styles.icon}>lock_open</span> unlock
          </span>
          <span className={styles.line}>your web3 reputation</span>
        </h1>
        {isMounted && isConnected ? (
          // <div onClick={getScore} className={styles.getScore}>
          //   Get Score
          // </div>
          <></>
        ) : (
          <div>You need to connect to get your score</div>
        )}
      </div>
    </div>
  );
};
