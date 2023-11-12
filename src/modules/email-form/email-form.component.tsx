import React from "react";
import { useEmailForm } from "../../hooks";

import styles from "./email-form.module.scss";
import classNames from "classnames";

export const EmailForm: React.FC = () => {
  const [email, setEmail] = React.useState("");
  const { error, isLoading, isSuccess, send } = useEmailForm();

  React.useEffect(() => {
    if (!isSuccess) return;
    setEmail("");
  }, [isSuccess]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    send(email);
  };

  const state = error
    ? "error"
    : isLoading
    ? "loading"
    : isSuccess
    ? "success"
    : null;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isLoading) return;

    setEmail(e.target.value);
  };

  return (
    <>
      <form
        //@ts-ignore
        className={classNames(styles.form, { [styles[state]]: state })}
        onSubmit={submit}
      >
        <input
          className={styles.input}
          type="email"
          value={email}
          placeholder={"gm@gmail.cc"}
          onChange={onChange}
        />
        <button className={styles.submit} type="submit">
          send
        </button>
      </form>
      <div
        className={classNames(
          styles.message,
          { [styles.show]: state },
          // @ts-ignore
          { [styles[state]]: state }
        )}
      >
        {state === "error" ? error : state}
      </div>
    </>
  );
};
