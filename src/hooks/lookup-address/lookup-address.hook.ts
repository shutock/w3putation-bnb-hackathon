import { ethers } from "ethers";
import React from "react";

const rpcs = [
  "https://eth.llamarpc.com",
  "https://eth.llamarpc.com",
  "https://rpc.ankr.com/eth",
  "https://uk.rpc.blxrbdn.com",
  "https://virginia.rpc.blxrbdn.com",
  "https://eth.rpc.blxrbdn.com",
  "https://rpc.payload.de",
  "https://rpc.builder0x69.io",
  "https://eth.drpc.org",
  "https://eth-mainnet.public.blastapi.io",
  "https://singapore.rpc.blxrbdn.com",
  "https://eth-mainnet.nodereal.io/v1/1659dfb40aa24bbb8153a677b98064d7",
  "https://rpc.mevblocker.io",
  "https://ethereum.blockpi.network/v1/rpc/public",
  "https://ethereum.publicnode.com",
  "https://eth-mainnet.g.alchemy.com/v2/demo",
  "https://eth-rpc.gateway.pokt.network",
  "https://api.securerpc.com/v1",
  "https://rpc.eth.gateway.fm",
  "https://eth.api.onfinality.io/public",
  "https://mainnet.gateway.tenderly.co",
  "https://cloudflare-eth.com",
  "https://gateway.tenderly.co/public/mainnet",
  "https://eth-mainnet.rpcfast.com?api_key=xbhWBI1Wkguk8SNMu1bvvLurPGLXmgwYeC4S6g2H7WdwFigZSmPWVZRxrskEQwIf",
  "https://eth.meowrpc.com",
  "https://core.gashawk.io/rpc",
  "https://api.zmok.io/mainnet/oaen6dy8ff6hju9k",
  "https://eth-mainnet-public.unifra.io",
  "https://rpc.flashbots.net",
  "https://endpoints.omniatech.io/v1/eth/mainnet/public",
  "https://api.bitstack.com/v1/wNFxbiJyQsSeLrX8RRCHi7NpRxrlErZk/DjShIqLishPCTB9HiMkPHXjUM9CNM9Na/ETH/mainnet",
  "https://1rpc.io/eth",
];

const ls = "ens-names";

export const useLookupAddress = (address?: string) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [name, setName] = React.useState<string | null>(null);

  const rpcId = Math.floor(Math.random() * rpcs.length);

  const lookup = async (address: string) => {
    setName(null);
    const stored = JSON.parse(window.localStorage.getItem(ls));

    if (stored && stored[address]) {
      setName(stored[address]);
      return;
    }

    try {
      setIsLoading(true);
      const provider = new ethers.providers.JsonRpcProvider(rpcs[rpcId]);

      const response = await provider.lookupAddress(address);

      response && setName(response);
      const stored = JSON.parse(window.localStorage.getItem(ls));

      if (stored) {
        window.localStorage.setItem(
          ls,
          JSON.stringify({ ...stored, [address]: response || null })
        );
      } else {
        window.localStorage.setItem(
          ls,
          JSON.stringify({ [address]: response || null })
        );
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (!address) return;

    lookup(address);
  }, [address]);

  const resolve = async (name: string) => {
    const provider = new ethers.providers.JsonRpcProvider(rpcs[rpcId]);
    const stored = JSON.parse(window.localStorage.getItem(ls));
    if (stored) {
      for (let key in stored) {
        if (stored[key] === name) return key;
      }
    }

    return await provider.resolveName(name);
  };

  return { isLoading, name, resolve, lookup };
};
