export const formatConnectorName = (name: string) => {
  if (name === "WalletConnect") return name;

  return name.replaceAll("Wallet", "").replaceAll("wallet", "").trim();
};
