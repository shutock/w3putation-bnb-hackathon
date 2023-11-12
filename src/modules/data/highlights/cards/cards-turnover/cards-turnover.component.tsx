import { useScoreStore } from "../../../../../hooks";

import styles from "./cards-turnover.module.scss";

type IProps = React.HTMLAttributes<HTMLDivElement>;

export const CardsTurnover: React.FC<IProps> = ({ className, ...props }) => {
  const {
    stats: { walletTurnoverUSD },
  } = useScoreStore((state) => state.data);

  const low = 1000;
  const avg = 10000;
  const high = 100000;

  const emoji =
    walletTurnoverUSD >= low
      ? walletTurnoverUSD >= avg
        ? walletTurnoverUSD >= high
          ? "high"
          : "avg"
        : "low"
      : "cheap";

  const text = {
    title: [
      "Little Activity",
      "Active User",
      "Should Be a Trader",
      "A Big Spender",
    ],
    text: [
      "This wallet has total spendings of less than {coin}{count}",
      "This wallet has total spendings of more than {coin}{count}",
    ],
  };

  const title =
    walletTurnoverUSD >= low
      ? walletTurnoverUSD >= avg
        ? walletTurnoverUSD >= high
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
          {walletTurnoverUSD < low
            ? text.text[0]
                .replace("{count}", `${Math.floor(walletTurnoverUSD) + 1}`)
                .replace("{coin}", "$")
            : text.text[1]
                .replace("{count}", `${Math.floor(walletTurnoverUSD)}`)
                .replace("{coin}", "$")}
          .
        </div>
      </div>
    </div>
  );
};
