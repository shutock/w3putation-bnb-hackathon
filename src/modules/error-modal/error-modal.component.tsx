import React from "react";
import { EmailForm } from "../email-form";
import styles from "./error-modal.module.scss";
import { useErrorModal } from "../../hooks/error-modal";
import classNames from "classnames";

export const ErrorModal: React.FC<{ error: string }> = ({ error }) => {
  const { close, isShow, isVisible } = useErrorModal();

  if (!isShow) return <></>;

  return (
    <div className={classNames(styles.overlay, { [styles.open]: isVisible })}>
      <div className={styles.bg} onClick={close} />
      <div className={styles.section}>
        <div className={styles.close} onClick={close}>
          close
        </div>
        <div className={styles.title}>There is an Error</div>
        <div className={styles.text}>{error}</div>
      </div>
    </div>
  );
};
