import { useRouter } from "next/router";
import { useMobile } from "../../hooks";
import styles from "./banner.module.scss";

export const Banner: React.FC = () => {
  const { isMobile: is1200 } = useMobile(1200);
  const { isMobile: is704 } = useMobile(704);
  const { push } = useRouter();

  const handler = () => push("/multichain");

  return (
    <div className={styles.section} onClick={handler}>
      <div className={styles.wrapper}>
        <div className={styles.chains}>
          <img
            className={styles.chain}
            src="/blockchains/ethereum.svg"
            alt=""
          />
          <img className={styles.chain} src="/blockchains/polygon.svg" alt="" />
          <img className={styles.chain} src="/blockchains/binance.svg" alt="" />
        </div>

        <div className={styles.titles}>
          <h3 className={styles.title}>Multichain Reputation Score is LIVE!</h3>
          {!is1200 && (
            <h4 className={styles.subtitle}>
              Access onchain reputation across top EVM networks.
            </h4>
          )}
        </div>

        <div className={styles.button}>{is704 ? "Mint" : "Mint Score"}</div>
      </div>
    </div>
  );
};
