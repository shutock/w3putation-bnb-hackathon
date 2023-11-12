import React from "react";

import { Line, LineChart } from "recharts";

import { useScoreStore } from "../../../../../hooks";

import styles from "./cards-activity.module.scss";
import classNames from "classnames";

type IProps = React.HTMLAttributes<HTMLDivElement>;

export const CardsActivity: React.FC<IProps> = ({ className, ...props }) => {
  const data = useScoreStore((state) => state.data);

  const ref: React.LegacyRef<HTMLDivElement> = React.useRef(null);

  const [width, setWidth] = React.useState(0);

  React.useEffect(() => {
    if (!ref) return;

    const handleResize = () => {
      setWidth(ref.current.offsetWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  React.useEffect(() => {
    setWidth(ref.current.offsetWidth);
  }, []);

  const currentDay = new Date();
  const yearAgoDay = new Date(currentDay);
  yearAgoDay.setFullYear(yearAgoDay.getFullYear() - 1);

  const activityCounts = formatActivity(data?.stats?.turnoverIntervals);

  const Chart: React.FC<{ activityCounts: any; id: number }> = ({
    activityCounts,
    id,
  }) => {
    return (
      <div
        className={classNames(styles.chart, styles[`_${id}`])}
        onClick={(e) => e.stopPropagation()}
      >
        <LineChart width={width + 16} height={80} data={activityCounts}>
          <Line
            type="natural"
            dataKey="value"
            stroke={"#ffffff"}
            strokeWidth={4}
            dot={false}
          />
          <Line
            type="natural"
            dataKey="value"
            stroke={"#ffffff"}
            strokeWidth={4}
            dot={false}
            filter="blur(.5rem)"
            opacity={0.5}
          />
        </LineChart>
      </div>
    );
  };

  return (
    <div
      // {...props}

      className={className ? `${className} ${styles.card}` : styles.card}
      ref={ref}
    >
      {/* <div className={styles.view}>
        <div className={styles.icon}>
          {isAllGraphs ? "stacked_line_chart" : "show_chart"}
        </div>
        <div className={styles.label}>{isAllGraphs ? "By Chain" : "Total"}</div>
      </div> */}
      <div className={styles.charts}>
        <Chart activityCounts={activityCounts} id={0} />
      </div>
      <div className={styles.info}>
        <h5 className={styles.title}>Wallet Pulse</h5>
        {activityCounts ? (
          <div className={styles.paragraph}>
            This is the wallet's onchain activity on zkSync chain.
            {/* <i>{months[maxMonth]}</i> is
            the most active month of the wallet. */}
          </div>
        ) : (
          <div className={styles.paragraph}>This wallet has no activity.</div>
        )}
      </div>
    </div>
  );
};

const formatActivity = (
  turnoverIntervals: {
    startDate: string;
    endDate: string;
    amountSumValue: number;
    amountOutSumValue: number;
    amountInSumValue: number;
    count: number;
  }[]
) => {
  if (!turnoverIntervals) return [];

  const activityRaw = turnoverIntervals?.map((item) => {
    return {
      month: new Date(item.startDate).getMonth(),
      year: new Date(item.startDate).getFullYear(),
      count: item.count,
    };
  });

  const currentDay = new Date();
  const yearAgoDay = new Date(currentDay);
  yearAgoDay.setFullYear(yearAgoDay.getFullYear() - 1);

  const activity = [];

  activity[11] = {
    month: currentDay.getMonth(),
    year: currentDay.getFullYear(),
    count: 0,
  };

  for (let i = 10; i >= 0; i--) {
    activity[i] = {
      month: activity[i + 1].month > 0 ? activity[i + 1].month - 1 : 11,
      year:
        activity[i + 1].month > 0
          ? activity[i + 1].year
          : activity[i + 1].year - 1,
      count: 0,
    };
  }
  let min = 99999;
  let max = 0;
  let maxMonth: number;

  for (let i = 0; i < activity.length; i++) {
    for (let j = 0; j < activityRaw?.length; j++) {
      if (
        activityRaw[j].month === activity[i].month &&
        activityRaw[j].year === activity[i].year
      ) {
        activity[i].count = activityRaw[j].count;
      }
    }
    if (min > activity[i].count) {
      min = activity[i].count;
    }
    if (max < activity[i].count) {
      max = activity[i].count;
      maxMonth = activity[i].month;
    }
  }

  const activityCounts = activity.map((item) => {
    return { value: item.count };
  });

  return activityCounts;
};

const sumValues = (graphics: { value: number }[][]) => {
  const length = graphics.length > 0 ? graphics[0].length : 0;
  const sums = [];

  for (let i = 0; i < length; i++) {
    let sum = 0;
    for (const obj of graphics) {
      if (obj[i] && obj[i].value) {
        sum += obj[i].value;
      }
    }
    sums.push({ value: sum });
  }

  return sums as { value: number }[];
};
