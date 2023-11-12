import React from "react";

const defaultBreakPoint = 1024;

type IWindowSize = {
  width: number;
  height: number;
};

export const useMobile = (width?: number) => {
  const mobileBreakpoint = width || defaultBreakPoint;

  const [windowSize, setWindowSize] = React.useState<IWindowSize>({
    width: 0,
    height: 0,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  React.useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  React.useEffect(() => {
    handleResize();
  }, []);

  return { isMobile: windowSize.width >= mobileBreakpoint ? false : true };
};
