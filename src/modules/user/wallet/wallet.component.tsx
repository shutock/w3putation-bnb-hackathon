import { useAccount, useDisconnect, useSigner } from "wagmi";
import { shortAddress } from "../../../lib";

import styles from "./wallet.module.scss";
import {
  useLookupAddress,
  useRecaptcha,
  useScore,
  useScoreStore,
} from "../../../hooks";
import React from "react";
import { MintScore } from "./mint-score";
import { Token } from "./token";

export const Wallet: React.FC = () => {
  const { disconnect } = useDisconnect();
  const setData = useScoreStore((state) => state.setData);

  const handleDisconnect = () => {
    setData(null);
    disconnect();
  };

  const [isMounted, setIsMounted] = React.useState(false);
  React.useEffect(() => setIsMounted(true), []);

  const { data: signer } = useSigner();

  const { address } = useAccount();
  const { name, lookup } = useLookupAddress();

  React.useEffect(() => {
    if (!address) return;

    lookup(address);
  }, [address, signer]);

  const { isVerified } = useRecaptcha();
  const { getScore, data: score, isLoading, error } = useScore();

  if (!isMounted) return;
  <div className={styles.container} key={"wallet_loading"}>
    <div className={styles.loading}>Loading...</div>
  </div>;

  return (
    <div className={styles.container} key={"wallet"}>
      <div className={styles.disconnect} onClick={handleDisconnect}>
        logout
      </div>
      <div className={styles.userInfo}>
        <img
          className={styles.avatar}
          src={`https://api.hexheads.io/img?hexId=${address}`}
          alt={`${address} generated pfp`}
        />

        <div className={styles.address}>
          {name ||
            shortAddress(address!).map((s, i) => (i === 1 ? s + "..." : s))}
        </div>
      </div>
      {!isLoading ? (
        <>
          {!score && isVerified && (
            <button className={styles.getScore} onClick={getScore}>
              Get Score
            </button>
          )}
        </>
      ) : !error ? (
        <div className={styles.loading}>Loading...</div>
      ) : (
        <button className={styles.getScore} onClick={getScore}>
          Get Score
        </button>
      )}
      <MintScore />
      <Token />
    </div>
  );
};
