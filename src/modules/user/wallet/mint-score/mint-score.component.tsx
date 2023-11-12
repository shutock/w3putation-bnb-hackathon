import React from "react";
import { opBNB } from "@/lib";
import {
  getContract,
  useContract,
  useMint,
  useMintStore,
  useOldToken,
  useScore,
  useScoreByAddress,
  useTokenPrice,
  useTrxStatus,
  useWhitelist,
} from "../../../../hooks";

import styles from "./mint-score.module.scss";

import classNames from "classnames";
import { useFormModal } from "../../../../hooks/form-modal";
import { ErrorModal } from "../../../error-modal";
import { useErrorModal } from "../../../../hooks/error-modal";
import { useAccount } from "wagmi";
import { ethers } from "ethers";

const isDebug = true;

export const MintScore: React.FC = () => {
  // const { mint, error, isLoading, trxHash } = useMint();
  const {
    mint: { error, isLoading, trx },
    token,
    getToken,
    mintToken,
  } = useContract();
  const setTrxHash = useMintStore((state) => state.setTrxHash);
  const { status } = useTrxStatus(trx?.hash);
  const { data, getScore } = useScore();
  const { getData } = useScoreByAddress();
  const { open } = useFormModal();
  const { open: openError } = useErrorModal();
  const { address } = useAccount();
  const {
    isWhitelisted,
    isLoading: wlLoading,
    getIsWhitelisted,
    //@ts-ignore
  } = useWhitelist({ address });

  const [value, setValue] = React.useState<string | null>(null);

  const isUpdate = token.isLoading ? null : token.data ? true : false;

  React.useEffect(() => {
    const rpc = opBNB.rpcUrls.public.http[0];

    const contract = getContract({
      rpc,
      address: "0xC388Fae5C90E0Fb95CA1E76674A3439db07A6579",
    });

    const getUpdateFee = async () => {
      return await contract["getUpdateFee"]();
    };

    const getIndividualUpdateFee = async () => {
      return await contract["getIndividualUpdateFee"](address, 11);
    };

    const getMintFee = async () => {
      return await contract["getMintFee"]();
    };

    const getIndividualMintFee = async () => {
      return await contract["getIndividualMintFee"](address, 11);
    };

    const getIsWhitelisted = async () => {
      return await contract["whitelist"](address, 11);
    };

    const getFee = async () => {
      const wl = await getIsWhitelisted();
      if (wl) {
        return setValue("FREE");
      }

      // isDebug && console.log("wl: ", wl);
      // isDebug && console.log("isUpdate: ", isUpdate);

      if (isUpdate === null) return;

      if (isUpdate) {
        const individualUpdateFee = (
          (await getIndividualUpdateFee()) as ethers.BigNumber
        ).toString();
        // isDebug && console.log("individualUpdateFee: ", individualUpdateFee);

        if (Number(individualUpdateFee) > 0) {
          return setValue(
            ethers.utils
              .formatEther(Number(individualUpdateFee).toString())
              .toString()
          );
        }

        const updateFee = (
          (await getUpdateFee()) as ethers.BigNumber
        ).toString();
        // isDebug && console.log("updateFee: ", updateFee);

        return setValue(
          ethers.utils.formatEther(Number(updateFee).toString()).toString()
        );
      } else {
        const individualMintFee = (
          (await getIndividualMintFee()) as ethers.BigNumber
        ).toString();
        // isDebug && console.log("individualMintFee: ", individualMintFee);

        if (Number(individualMintFee) > 0) {
          return setValue(
            ethers.utils
              .formatEther(Number(individualMintFee).toString())
              .toString()
          );
        }

        const mintFee = ((await getMintFee()) as ethers.BigNumber).toString();
        // isDebug && console.log("mintFee: ", mintFee);

        return setValue(ethers.utils.formatEther(mintFee).toString());
      }
    };

    getFee();
  }, [isWhitelisted, token, address, isUpdate]);

  React.useEffect(() => {
    if (status !== "success") return;

    setTimeout(() => {
      open();
    }, 15000);
    getData(data!.address);
  }, [data, getData, open, status]);

  // const { data: token } = useScoreByAddress();

  React.useEffect(() => {
    //@ts-ignore
    getToken({ address, blockchainId: opBNB.id, calculationModel: 11 });
  }, [status, address, getToken]);

  //@ts-ignore
  const mint = () => mintToken(data.mintData);

  const refresh = () => getScore();

  React.useEffect(() => {
    getIsWhitelisted();
  }, [address, getIsWhitelisted]);

  const { data: token_old, isLoading: isLoading_old } = useOldToken();

  const isMigrating =
    !isLoading_old && token_old && !token.isLoading && !token.data;

  const { data: nativeToken } = useTokenPrice("ethereum");

  if (wlLoading || isLoading_old || token.isLoading)
    return <div>Loading...</div>;

  if (!data) return <div></div>;

  return (
    <div className={styles.container}>
      {!data.stats.noData ? (
        error ? (
          <div className={styles.error}>
            <h5 className={styles.title}>There is an error occurred!</h5>
            <div className={styles.show} onClick={openError}>
              Show
            </div>
            <div className={styles.buttons}>
              <button className={styles.mint} onClick={mint}>
                <div className={styles.label}>
                  {token.data ? "Update Score" : "Mint Score"}
                </div>
                <div className={styles.price}>
                  {value === "FREE" ? (
                    <>FREE</>
                  ) : (
                    <>
                      {value} ETH
                      {nativeToken?.usd &&
                        ` ($${(nativeToken!.usd * Number(value)).toLocaleString(
                          undefined,
                          {
                            maximumFractionDigits: 2,
                          }
                        )})`}
                    </>
                  )}
                </div>
              </button>

              <button className={styles.refresh} onClick={refresh}>
                refresh
              </button>
            </div>
            <ErrorModal error={error} />
          </div>
        ) : isLoading ? (
          <div className={styles.loading}>Loading...</div>
        ) : trx?.hash ? (
          <div className={styles.explorer}>
            <a
              className={styles.link}
              // @ts-ignore
              href={`${opBNB.blockExplorers.default.url}/tx/${trx?.hash}`}
              target="_blank"
            >
              Open in Explorer
            </a>
            <div
              className={classNames(styles.status, styles[status || "pending"])}
            >
              {status || "pending..."}
            </div>
          </div>
        ) : (
          <div className={styles.buttons}>
            <button className={styles.mint} onClick={mint}>
              <div className={styles.label}>
                {!token.data ? "Mint Score" : "Update Score"}
              </div>
              <div className={styles.price}>
                {value === "FREE" ? (
                  <>FREE</>
                ) : (
                  <>
                    {value} ETH
                    {nativeToken?.usd &&
                      ` ($${(nativeToken!.usd * Number(value)).toLocaleString(
                        undefined,
                        {
                          maximumFractionDigits: 2,
                        }
                      )})`}
                  </>
                )}
              </div>
            </button>

            <button className={styles.refresh} onClick={refresh}>
              refresh
            </button>
          </div>
        )
      ) : (
        <div className={styles.nullAddress}>
          Make at least 2 transaction on opBNB, BSC or Ethereum to get a Score
        </div>
      )}
    </div>
  );
};
