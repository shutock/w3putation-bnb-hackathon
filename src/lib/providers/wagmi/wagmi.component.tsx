/** HARDCODE */

import { WagmiConfig, configureChains, createClient } from "wagmi";

import { zkSync } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

const projectId = "d490e25d481dfce1ca3216452a1c200f";

type Props = {
  children?: React.ReactNode;
};

export const Wagmi: React.FC<Props> = ({ children }) => {
  const { chains, provider, webSocketProvider } = configureChains(
    [zkSync],
    [publicProvider()]
  );

  const client = createClient({
    provider,
    webSocketProvider,
    connectors: [
      new InjectedConnector({ chains }),
      new MetaMaskConnector({ chains }),
      new WalletConnectConnector({
        chains,
        options: {
          projectId,
        },
      }),
    ],
    autoConnect: true,
  });

  return <WagmiConfig client={client}>{children}</WagmiConfig>;
};
