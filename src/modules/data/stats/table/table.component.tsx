import { useScoreStore } from "../../../../hooks";

import styles from "./table.module.scss";

export const Table: React.FC = () => {
  const data = useScoreStore((state) => state.data);

  const stats = [];
  let i = 0;

  for (var key in data.stats) {
    stats[i] = {
      title: key,
      value: data.stats[key],
    };

    let founded = false;

    for (var key1 in data.stats.statsDescriptions) {
      if (key.toLowerCase() === key1.toLowerCase()) {
        stats[i].label = data.stats.statsDescriptions[key1].label;
        stats[i].description = data.stats.statsDescriptions[key1].description;
        stats[i].units = data.stats.statsDescriptions[key1].units;

        founded = true;
      }
    }

    if (founded) {
      i++;
    } else {
      stats.splice(i, 1);
    }
  }

  return (
    <div className={styles.table}>
      <div className={styles.header}>
        <div className={styles.row}>
          <div className={styles.cell}>Label</div>
          <div className={styles.cell}>Value</div>
          <div className={styles.cell}>Description</div>
        </div>
      </div>
      <div className={styles.body}>
        {stats.map((stat) => {
          return (
            <div className={styles.row} key={stat.label}>
              <div className={styles.cell}>{stat.label}</div>
              <div className={styles.cell}>
                {stat.value === 0
                  ? 0
                  : stat.value > 0.01
                  ? (stat.value as number).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  : stat.value > 0.0001
                  ? stat.value.toFixed(4)
                  : stat.value > 0.000001
                  ? stat.value.toFixed(6)
                  : "<0.000001"}
              </div>
              <div className={styles.cell}>
                <div className={styles.description}>
                  {stat.description}
                  {stat.units && (
                    <div className={styles.units}>{stat.units}</div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
