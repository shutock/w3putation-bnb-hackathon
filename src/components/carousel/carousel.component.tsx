import React from "react";

import type { HTMLAttributes, RefObject } from "react";

import { CarouselContext } from "./carousel-context";

import { CarouselArrows } from "./carousel-arrows";
import { CarouselCounter } from "./carousel-counter";
import { CarouselDots } from "./carousel-dots";
import { CarouselSlide } from "./carousel-slide";
import { CarouselSlides } from "./carousel-slides";

import styles from "./carousel.module.scss";

interface IProps extends HTMLAttributes<HTMLDivElement> {}

const gap = 16;

const scrollTo = (
  slider: HTMLDivElement | null,
  slide: number,
  width: number
) => {
  if (!slider) return;

  slider.scrollTo({
    left: (slide - 1) * (width + gap),
    behavior: "smooth",
  });
};

export const Carousel = ({ children, className, ...props }: IProps) => {
  const [width, setWidth] = React.useState(0);
  const [pos, setPos] = React.useState(0);
  const [slides, setSlides] = React.useState(0);
  const [ref, setRef] = React.useState<RefObject<HTMLDivElement> | null>(null);

  const currentSlide = Math.round(pos / (width + gap) + 1);

  const goTo = React.useCallback(
    (slide: number) => {
      if (!ref) return;
      scrollTo(ref.current, slide, width);
    },
    [ref, width]
  );

  const context = {
    slides,
    currentSlide,
    goTo,
    config: { setPos, setRef, setWidth, ref, setSlides },
  };

  return (
    <CarouselContext.Provider value={context}>
      <div
        {...props}
        className={
          className ? `${className} ${styles.carousel}` : styles.carousel
        }
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
};

Carousel.Arrows = CarouselArrows;
Carousel.Counter = CarouselCounter;
Carousel.Dots = CarouselDots;
Carousel.Slide = CarouselSlide;
Carousel.Slides = CarouselSlides;
