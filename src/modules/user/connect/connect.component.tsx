/** HARDCODE */

import { useConnect } from "wagmi";

import styles from "./connect.module.scss";
import { formatConnectorName } from "../../../lib";
import { zkSync } from "wagmi/chains";
import classNames from "classnames";

import { useSearchParams } from "next/navigation";

export const Connect: React.FC = () => {
  const { connect, connectors, isLoading, pendingConnector } = useConnect();

  const searchParams = useSearchParams();
  const ref = searchParams.get("ref");

  const injectedConnector = connectors.find((c) => c.id === "injected");

  return (
    <div className={styles.container} key={"connect"}>
      <div className={styles.header}>
        <div className={styles.icon}>wallet</div>
        <h5 className={styles.title}>Connect to get Score</h5>
      </div>
      <div className={styles.body}>
        {connectors.map((connector) => {
          const { id, name } = connector;

          if (id === "injected" && name === "MetaMask") return;
          if (name === "Injected") return;
          if (id === "metaMask" && injectedConnector?.name === "Injected")
            return (
              <a
                className={styles.connector}
                href={`https://metamask.app.link/dapp/w3putationn.vercel.app/opBNB${
                  ref ? `?ref=${ref}` : ""
                }`}
                target="_blank"
              >
                MetaMask
              </a>
            );

          const handler = () => {
            connect({ connector, chainId: zkSync.id });
          };

          const isPending = isLoading && pendingConnector === connector;

          return (
            <div
              className={classNames(styles.connector, {
                [styles.loading]: isPending,
              })}
              key={id}
              onClick={handler}
            >
              {formatConnectorName(name)}
              {isPending && " is waiting for you..."}
            </div>
          );
        })}
      </div>
    </div>
  );
};
