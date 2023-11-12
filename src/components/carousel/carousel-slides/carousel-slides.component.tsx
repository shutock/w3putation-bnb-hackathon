import React, { LegacyRef } from "react";

import { useCarouselContext } from "../carousel-context";

import type { FC, HTMLAttributes } from "react";

import styles from "./carousel-slides.module.scss";

interface IProps extends HTMLAttributes<HTMLDivElement> {}

export const CarouselSlides: FC<IProps> = ({ children, ...props }) => {
  const {
    config: { setPos, setRef, setSlides, setWidth },
  } = useCarouselContext();

  const ref: LegacyRef<HTMLDivElement> = React.useRef(null);

  const handleResize = () => {
    if (!ref?.current) return;

    setWidth(ref.current.offsetWidth - 48);
  };

  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    setRef(ref);
  }, [setRef]);

  React.useEffect(() => {
    setSlides(React.Children.count(children));
  }, [children, setSlides]);

  return (
    <div
      {...props}
      className={styles.slides}
      ref={ref}
      onScroll={(e) => {
        setPos(e.currentTarget.scrollLeft);
      }}
    >
      {children}
    </div>
  );
};
