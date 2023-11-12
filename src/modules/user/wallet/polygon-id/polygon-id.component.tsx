import { QR } from "qr-svg";
import { useRecaptcha } from "../../../../hooks";
import { usePolygonId } from "../../../../hooks/polygon-id";
import { Modal } from "./modal";
import styles from "./polygon-id.module.scss";
import QRCode from "react-qr-code";
import React from "react";
import { Connect } from "./connect";
import { Claim } from "./claim";

export const PolygonId: React.FC = () => {
  const { did } = usePolygonId();
  const { isVerified } = useRecaptcha();

  if (!isVerified) return <></>;

  if (!did) return <Connect />;

  return <Claim />;
};
