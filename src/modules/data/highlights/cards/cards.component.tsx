import { Carousel } from "../../../../components";
import { useMobile } from "../../../../hooks";
import { CardsActivity } from "./cards-activity";
import { CardsAge } from "./cards-age";
import { CardsScore } from "./cards-score";
import { CardsTurnover } from "./cards-turnover";

import styles from "./cards.module.scss";

type IProps = React.HTMLAttributes<HTMLDivElement>;

export const Cards: React.FC<IProps> = ({ className, ...props }) => {
  const { isMobile } = useMobile();
  return (
    <div {...props} className={styles.section}>
      {!isMobile ? (
        <div className={styles.cards}>
          <CardsScore />
          <CardsActivity />
          <CardsTurnover />
        </div>
      ) : (
        <Carousel>
          <Carousel.Slides>
            <Carousel.Slide slideId={0}>
              <CardsScore />
            </Carousel.Slide>
            <Carousel.Slide slideId={2}>
              <CardsActivity />
            </Carousel.Slide>
            <Carousel.Slide slideId={2}>
              <CardsTurnover />
            </Carousel.Slide>
            {/* <Carousel.Slide slideId={3}>
            <CardsAge />
          </Carousel.Slide> */}
          </Carousel.Slides>
          <Carousel.Counter />
          <Carousel.Dots
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "1rem",
            }}
          />
        </Carousel>
      )}
    </div>
  );
};
