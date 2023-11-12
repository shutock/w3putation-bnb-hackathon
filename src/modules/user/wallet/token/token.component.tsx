import React from "react";

import { useAccount, useSigner } from "wagmi";
import { useContract, useOldToken } from "../../../../hooks";

import styles from "./token.module.scss";
import { opBNB } from "@/lib";

const contractAddress = "0xC388Fae5C90E0Fb95CA1E76674A3439db07A6579";

export const Token: React.FC = () => {
  const { address } = useAccount();
  // const { data, error, getData, isLoading } = useScoreByAddress();
  const { data: signer } = useSigner();

  const { data: data_old, getData, isLoading: isLoading_old } = useOldToken();

  const {
    token: { data, error, isLoading },
    getToken,
  } = useContract();

  React.useEffect(() => {
    if (!address) return;
    if (status && status !== "success") return;

    // getData(address);
    getToken({ address, blockchainId: opBNB.id, calculationModel: 11 });
    getData(address);
  }, [address, signer, status]);

  const needToMigrate = !isLoading && !isLoading_old && data_old && !data;

  if (isLoading) return <div className={styles.container}>Loading...</div>;

  if (!data) return <></>;

  const attr = [
    { label: "Score", value: data.score / 100 },
    { label: "Token Id", value: data.tokenId },
    {
      label: "Updated",
      value: new Date(data.updated * 1000).toLocaleDateString("en-Us"),
    },
  ];

  const elementUrl = `https://element.market/assets/zksync/${contractAddress}/${data.tokenId}`;

  return (
    <div className={styles.container}>
      {needToMigrate && (
        <div className={styles.migrate}>
          You need to migrate your token to the new contract
        </div>
      )}
      <h5>Minted Score</h5>
      <div className={styles.info}>
        <img className={styles.image} src={data.image} alt="" />
        <div className={styles.attributes}>
          {attr.map((a) => {
            return (
              <div className={styles.attribute} key={a.label}>
                <div className={styles.label}>{a.label}</div>
                <div className={styles.value}>{a.value}</div>
              </div>
            );
          })}
        </div>
      </div>
      <a
        className={styles.element}
        href={elementUrl}
        target="_blank"
        rel="noreferrer"
      >
        <img className={styles.logo} src="/element-market.svg" />
        <div className={styles.label}>View on Element</div>
      </a>
    </div>
  );
};
