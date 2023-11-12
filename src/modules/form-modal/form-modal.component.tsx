import React from "react";
import { EmailForm } from "../email-form";
import styles from "./form-modal.module.scss";
import { useFormModal } from "../../hooks/form-modal";
import classNames from "classnames";

export const FormModal: React.FC = () => {
  const { close, isShow, isVisible } = useFormModal();

  if (!isShow) return <></>;

  return (
    <div className={classNames(styles.overlay, { [styles.open]: isVisible })}>
      <div className={styles.bg} onClick={close} />
      <div className={styles.section}>
        <div className={styles.close} onClick={close}>
          close
        </div>
        <div className={styles.title}>Sign Up for the Waitlist ✍️</div>
        <div className={styles.text}>
          Stay informed about upcoming updates—we are working hard on something
          exciting that will allow you to utilize your score.
        </div>
        <EmailForm />
      </div>
    </div>
  );
};
