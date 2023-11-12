import styles from "./stats.module.scss";
import { Table } from "./table";

export const Stats: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2>Stats</h2>
      <Table />
    </div>
  );
};
