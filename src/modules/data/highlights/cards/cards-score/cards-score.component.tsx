import { Pie, PieChart } from "recharts";

import { useScoreStore } from "../../../../../hooks";

import styles from "./cards-score.module.scss";

type IProps = React.HTMLAttributes<HTMLDivElement>;

export const CardsScore: React.FC<IProps> = ({ className, ...props }) => {
  const { score } = useScoreStore((state) => state.data)!;

  return (
    <div
      {...props}
      className={className ? `${className} ${styles.card}` : styles.card}
      style={{
        // @ts-ignore
        "--hue": `${140 * score}`,
      }}
    >
      <div className={styles.chart}>
        <Chart score={score} />
        <div className={styles.score}>{Math.floor(score * 100)}</div>
      </div>
      <div className={styles.info}>
        <h5 className={styles.title}>opBNB Score</h5>
        <div className={styles.paragraph}>
          {`The overall opBNB score is ${(score * 100).toFixed(2)}/100.`}
        </div>
      </div>
    </div>
  );
};

const Chart: React.FC<{ score: number }> = ({ score }) => {
  return (
    <PieChart width={64} height={64}>
      <Pie
        data={[{ name: "placeholder", value: 1 }]}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={32}
        innerRadius={24}
        startAngle={90}
        endAngle={90 + 360 * score}
        cornerRadius={999}
        stroke="none"
        fill="#fff"
      />
      <Pie
        data={[{ name: "placeholder", value: 1 }]}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={32}
        innerRadius={24}
        startAngle={90}
        endAngle={90 + 360 * score}
        cornerRadius={999}
        stroke="none"
        fill="#fff"
        filter="blur(.5rem)"
      />
      <Pie
        data={[{ name: "placeholder", value: 1 }]}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={32}
        innerRadius={24}
        startAngle={90}
        endAngle={90 + 360}
        cornerRadius={999}
        stroke="none"
        fill="#fff"
        opacity={0.2}
      />
    </PieChart>
  );
};
