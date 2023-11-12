import { Footer } from "./footer";
import { Header } from "./header";
import { Main } from "./main";

import styles from "./layout.module.scss";

type Props = {
  children?: React.ReactNode;
};

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles.page}>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </div>
  );
};
