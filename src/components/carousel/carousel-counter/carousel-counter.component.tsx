import type { FC, HTMLAttributes } from "react";
import { useCarouselContext } from "../carousel-context";

import styles from "./carousel-counter.module.scss";

interface IProps extends HTMLAttributes<HTMLDivElement> {}

export const CarouselCounter: FC<IProps> = (props) => {
  const { currentSlide, slides } = useCarouselContext();

  return (
    <div {...props} className={styles.counter}>
      <div className={styles.current}>{currentSlide}</div>
      <div className={styles.slash}>/</div>
      <div className={styles.total}>{slides}</div>
    </div>
  );
};
