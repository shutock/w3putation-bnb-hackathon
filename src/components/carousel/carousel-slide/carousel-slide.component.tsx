import { useCarouselContext } from "../carousel-context";

import type { HTMLAttributes, FC } from "react";

import styles from "./carousel-slide.module.scss";
import React from "react";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  slideId: number;
}

export const CarouselSlide: FC<IProps> = ({
  slideId,
  className,
  children,
  ...props
}) => {
  const { goTo, currentSlide } = useCarouselContext();

  const handler = () => {
    if (currentSlide === slideId) return;

    goTo(slideId);
  };

  return (
    <div
      {...props}
      onClick={handler}
      className={!className ? styles.slide : `${className} ${styles.slide}`}
    >
      {children}
    </div>
  );
};
