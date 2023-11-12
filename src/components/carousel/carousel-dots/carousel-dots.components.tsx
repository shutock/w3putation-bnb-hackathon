import { useCarouselContext } from "../carousel-context";

import styles from "./carousel-dots.module.scss";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CarouselDots: React.FC<IProps> = (props) => {
  const { currentSlide, slides, goTo } = useCarouselContext();

  const dots = [];

  for (let i = 0; i < slides; i++) {
    dots[i] = i;
  }

  return (
    <div {...props} className={styles.dots}>
      {dots.map((i) => {
        const isCurrent = currentSlide - 1 === i;

        const onClick = () => {
          if (isCurrent) return;

          goTo(i + 1);
        };

        return (
          <div
            onClick={onClick}
            key={i}
            className={
              isCurrent ? `${styles.current} ${styles.dot}` : styles.dot
            }
          />
        );
      })}
    </div>
  );
};
