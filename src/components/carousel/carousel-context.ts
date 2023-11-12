import React from "react";

import type { Dispatch, SetStateAction, RefObject } from "react";

type ICarouselContext = {
  slides: number;
  currentSlide: number;
  goTo: (slide: number) => void;
  config: {
    setWidth: Dispatch<SetStateAction<number>>;
    setPos: Dispatch<SetStateAction<number>>;
    setSlides: Dispatch<SetStateAction<number>>;
    setRef: Dispatch<SetStateAction<RefObject<HTMLDivElement> | null>>;
    ref: RefObject<HTMLDivElement> | null;
  };
};

export const CarouselContext = React.createContext<
  ICarouselContext | undefined
>(undefined);

export const useCarouselContext = () => {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error("Carousel error");
  }

  return context;
};
