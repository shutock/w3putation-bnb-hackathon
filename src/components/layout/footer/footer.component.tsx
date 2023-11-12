import styles from "./footer.module.scss";

export const Footer: React.FC = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <div className={styles.section}>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.copyright}>
            <div className={styles.text}>
              w3putation © {year}. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
