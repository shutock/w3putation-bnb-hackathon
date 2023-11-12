import { useAccount, useSigner } from "wagmi";

import { Connect } from "./connect";
import { Wallet } from "./wallet";

import styles from "./user.module.scss";
import React from "react";
// import { useBlockchains } from "../../../hooks";

export const User: React.FC = () => {
  const [isMounted, setIsMounted] = React.useState(false);

  const { isConnected } = useAccount();
  const [isC, setIsC] = React.useState(false);
  React.useEffect(() => setIsC(isConnected), [isConnected]);

  React.useEffect(() => setIsMounted(true), []);

  if (!isMounted)
    return (
      <div className={styles.section} key={"mounting"}>
        <div className={styles.loading}>Loading...</div>
      </div>
    );

  if (!isC)
    return (
      <div className={styles.section} key={"connect"}>
        <Connect />
      </div>
    );

  return (
    <div className={styles.section} key={"wallet"}>
      <Wallet />
    </div>
  );
};
