import { QR } from "qr-svg";
import { usePolygonId } from "../../../../../hooks/polygon-id";
import { Modal } from "../modal";

import styles from "./claim.module.scss";
import { useScore } from "../../../../../hooks";

export const Claim: React.FC = () => {
  const { open, close, claimQr } = usePolygonId();

  const { data } = useScore();

  const code = claimQr ? QR(`${claimQr}`) : null;

  if (!data) return <>Loading...</>;

  return (
    <>
      <div className={styles.container}>
        <h5 className={styles.title}>Claim Credential</h5>
        <button className={styles.button} onClick={open}>
          Claim
        </button>
      </div>
      <Modal>
        <h3>Scan QR via Polygon ID Wallet App</h3>

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
      </Modal>
    </>
  );
};
