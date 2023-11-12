import React from "react";

import { useScoreStore } from "../../../../../hooks";

import styles from "./cards-age.module.scss";

type IProps = React.HTMLAttributes<HTMLDivElement>;

export const CardsAge: React.FC<IProps> = ({ className, ...props }) => {
  const {
    stats: { walletAge },
  } = useScoreStore((state) => state.data);

  const young = 6;
  const medium = 12;
  const old = 24;

  const emoji =
    walletAge >= young
      ? walletAge >= medium
        ? walletAge >= old
          ? "old"
          : "medium"
        : "young"
      : "new";

  const text = {
    title: [
      "At the Beginning of the Path",
      "Just a Beginner",
      "Crypto-Friendly Wallet",
      "A Pretty Old Wallet",
    ],
    text: [
      "Welcome to the Web3 world..",
      "This wallet was created {month} months ago",
    ],
  };

  const title =
    walletAge >= young
      ? walletAge >= medium
        ? walletAge >= old
          ? text.title[3]
          : text.title[2]
        : text.title[1]
      : text.title[0];

  return (
    <div
      {...props}
      className={className ? `${className} ${styles.card}` : styles.card}
    >
      <img className={styles.emoji} src={`/emoji/${emoji}.png`} alt="emoji" />
      <div className={styles.info}>
        <h5 className={styles.title}>{title}</h5>
        <div className={styles.paragraph}>
          {walletAge <= 1
            ? text.text[0]
            : text.text[1].replace("{month}", walletAge.toString())}
          .
        </div>
      </div>
    </div>
  );
};
