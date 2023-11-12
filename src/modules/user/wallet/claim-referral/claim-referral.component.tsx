import React from "react";
import { useContract, useTrxStatus } from "../../../../hooks";
import { useAccount } from "wagmi";

import styles from "./claim-referral.module.scss";
import classNames from "classnames";

const isDebug = false;

export const ClaimReferral: React.FC = () => {
  const { address } = useAccount();
  const {
    referral: {
      claimableReward,
      error,
      isLoading,
      rewardPerReferral,
      referrals,
    },
    claim,
    claimReward,
    getReferralData,
  } = useContract();

  // const { status } = useTrxStatus(claimReward.trx.hash);
  const { status } = useTrxStatus(claimReward.trx.hash);

  const openModal = () => {
    setIsModalRender(true);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setIsModalRender(false), 200);
  };

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isModalRender, setIsModalRender] = React.useState(false);

  React.useEffect(() => {
    if (!address) return;
    if (status === "pending") return;

    // isDebug && console.log("getting referrals");

    getReferralData({ address });
  }, [address, status]);

  // isDebug && console.log("claim status: ", status);

  // isDebug && console.log("trx: ", claimReward.trx.hash);

  React.useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isModalOpen]);

  React.useEffect(() => {
    if (!isModalOpen) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (!isModalOpen) return;

      if (e.key === "Escape") closeModal();
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  if (isLoading) return <p key={"loading"}>Loading...</p>;

  const hasReferrals = Number(claimableReward) > 0 && referrals?.length > 0;

  const isButtonDisabled = claimReward.trx.hash && status !== "success";

  return (
    <>
      <div onClick={openModal} className={styles.invite}>
        {hasReferrals ? (
          `Claim ${claimableReward} ETH!`
        ) : (
          <div className={styles.nothingToClaim}>
            You have nothing to claim.
          </div>
        )}
      </div>
      {isModalRender && (
        <div
          className={classNames(styles.wrapper, {
            [styles.close]: !isModalOpen,
          })}
        >
          <div
            style={{ position: "absolute", inset: 0 }}
            onClick={closeModal}
          />
          <aside className={styles.modal}>
            <div className={styles.header}>
              <h3 className={styles.title}>Invite to Earn</h3>
              <div className={styles.icon} onClick={closeModal}>
                close
              </div>
            </div>
            <div className={styles.body}>
              <div className={styles.title}>Users you've invited:</div>
              <div className={styles.count}>{referrals?.length ?? 0}</div>
            </div>
            <div className={styles.footer}>
              {hasReferrals ? (
                <>
                  <button
                    onClick={claim}
                    className={styles.button}
                    disabled={isButtonDisabled}
                  >
                    {isButtonDisabled
                      ? "Claiming..."
                      : `Claim ${claimableReward} ETH`}
                  </button>
                </>
              ) : (
                <div className={styles.helper} onClick={claim}>
                  Invite more to claim your reward.
                </div>
              )}
              {claimReward.error && (
                <div className={styles.error}>{claimReward.error}</div>
              )}
              {claimReward.trx?.hash && (
                <div
                  className={classNames(
                    styles.status,
                    styles[status || "pending"]
                  )}
                >
                  {status || "pending..."}
                </div>
              )}
            </div>
          </aside>
        </div>
      )}
    </>
  );
};
