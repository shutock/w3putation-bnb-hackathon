import { Wagmi } from "./wagmi";

type Props = {
  children?: React.ReactNode;
};

export const Providers: React.FC<Props> = ({ children }) => {
  return <Wagmi>{children}</Wagmi>;
};
