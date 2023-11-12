import styles from "./main.module.scss";

type Props = {
  children?: React.ReactNode;
};

export const Main: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles.section}>
      <div className={styles.wrapper}>{children}</div>
    </div>
  );
};
