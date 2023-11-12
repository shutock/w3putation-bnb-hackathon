import type { FC, HTMLAttributes } from "react";

import { useCarouselContext } from "../carousel-context";

import styles from "./carousel-arrows.module.scss";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  iconLeft?: string;
  iconRight?: string;
  classNameLeft?: string;
  classNameRight?: string;
}

export const CarouselArrows: FC<IProps> = ({
  iconLeft = "chevron_left",
  iconRight = "chevron_right",
  className,
  classNameLeft,
  classNameRight,
  ...props
}) => {
  const { goTo, currentSlide, slides } = useCarouselContext();

  const left = () => {
    if (currentSlide <= 1) return;

    goTo(currentSlide - 1);
  };

  const right = () => {
    if (currentSlide >= slides) return;

    goTo(currentSlide + 1);
  };

  return (
    <div
      {...props}
      className={className ? `${className} ${styles.arrows}` : styles.arrows}
    >
      <div
        onClick={left}
        className={
          classNameLeft ? `${classNameLeft} ${styles.left}` : styles.left
        }
      >
        <div className={styles.icon}>{iconLeft}</div>
      </div>
      <div
        onClick={right}
        className={
          classNameRight ? `${classNameRight} ${styles.right}` : styles.right
        }
      >
        <div className={styles.icon}>{iconRight}</div>
      </div>
    </div>
  );
};
