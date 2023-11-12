import { Cards } from "./cards";
import styles from "./highlights.module.scss";

export const Highlights: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2>Highlights</h2>
      <Cards />
    </div>
  );
};
