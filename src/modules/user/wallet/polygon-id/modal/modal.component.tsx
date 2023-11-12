import React from "react";

import styles from "./modal.module.scss";

import classNames from "classnames";
import { usePolygonId } from "../../../../../hooks/polygon-id";

export const Modal: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const { close, isShow, isVisible } = usePolygonId();

  if (!isShow) return <></>;

  return (
    <div className={classNames(styles.overlay, { [styles.open]: isVisible })}>
      <div className={styles.bg} onClick={close} />
      <div className={styles.section}>
        <div className={styles.close} onClick={close}>
          close
        </div>
        {children}
      </div>
    </div>
  );
};
