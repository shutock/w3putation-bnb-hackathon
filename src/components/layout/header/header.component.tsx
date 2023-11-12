/** Hardcode */

import React from "react";
import styles from "./header.module.scss";
import Link from "next/link";

export const Header: React.FC = () => {
  const [z, setZ] = React.useState(1);

  React.useEffect(() => {
    const handler = () => {
      const isOverflow = window.document.body.style.overflow === "hidden";
      setZ(isOverflow ? -1 : 1);
    };

    const observer = new MutationObserver(handler);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["style"],
    });
  }, []);

  return (
    <div className={styles.section} style={{ zIndex: z }}>
      <div className={styles.wrapper}>
        <Link href="/" className={styles.logo}>
          <div className={styles.label}>w3putation</div>
          <div className={styles.beta}>βeta</div>
        </Link>
        <div className={styles.description}>
          <div className={styles.chains}>
            <img className={styles.chain} src="/blockchains/opbnb.svg" alt="" />
          </div>
          <div className={styles.label}>opBNB Score</div>
        </div>
      </div>
    </div>
  );
};
