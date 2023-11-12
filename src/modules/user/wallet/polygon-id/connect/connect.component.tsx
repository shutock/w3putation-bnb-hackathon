import { QR } from "qr-svg";
import { usePolygonId } from "../../../../../hooks/polygon-id";
import { Modal } from "../modal";
import styles from "./connect.module.scss";
import React from "react";

export const Connect: React.FC = () => {
  const { setIsAdding, open, getQr, qr, qrState, close, did } = usePolygonId();

  const code = qr ? QR(JSON.stringify(qr)) : null;

  React.useEffect(() => {
    if (!did) return;

    close();
  }, [did]);

  return (
    <>
      <div className={styles.container}>
        <h5 className={styles.title}>Want to Add Credential to Polygon ID?</h5>
        {did || ""}
        <div className={styles.buttons}>
          <button
            className={styles.button}
            onClick={() => {
              setIsAdding(true);
              open();
              getQr();
            }}
          >
            Yes
          </button>
          <button className={styles.button} onClick={() => setIsAdding(false)}>
            No
          </button>
        </div>
      </div>
      <Modal>
        <h3>Scan QR via Polygon ID Wallet App</h3>
        {qrState.isLoading ? (
          "Loading..."
        ) : (
          <div
            style={{
              width: "100%",
              maxWidth: "20rem",
              aspectRatio: "1",
              display: "block",
              fill: "white",
            }}
            dangerouslySetInnerHTML={{ __html: code }}
          />
        )}
      </Modal>
    </>
  );
};
