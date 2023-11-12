import React from "react";

import { useTokenPriceStore } from "./token-price.store";
import { readableError } from "../../lib";

export const useTokenPrice = (symbol: string) => {
  const { setTokenData, tokens } = useTokenPriceStore((state) => state);

  React.useEffect(() => {
    if (tokens.has(symbol)) return;
    if (tokens.get(symbol)?.isLoading) return;

    const getTokenPrice = async () => {
      try {
        setTokenData({ symbol, data: { isLoading: true } });

        const response = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=usd`
        );
        const data = await response.json();
        const usd = data[symbol]?.usd ?? null;

        setTokenData({ symbol, data: { usd, isLoading: false } });
      } catch (err) {
        const readableErr = readableError(err);
        setTokenData({
          symbol,
          data: { isLoading: false, error: readableErr },
        });
      }
    };

    getTokenPrice();
  }, []);

  return { data: tokens.get(symbol) };
};
