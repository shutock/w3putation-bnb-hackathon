import React from "react";

import jwt from "jsonwebtoken";

import type { IUser } from "./user.type";
import { readableError } from "../../../lib";

const apiPath = "";

export const useConnect = () => {
  const [qr, setQr] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [sessionId, setSessionId] = React.useState<string | null>(null);
  const [user, setUser] = React.useState<IUser | null>(null);

  const [isConnected, setIsConnected] = React.useState(false);

  const sessionIdRef = React.useRef<string | null>();

  const getQr = async () => {
    const lsSessionId = window.localStorage.getItem("sessionId");

    if (lsSessionId) {
      setSessionId(lsSessionId);
      sessionIdRef.current = lsSessionId;
    } else {
      const newSessionId = `${Math.random().toFixed(40)}`.replace("0.", "");
      sessionIdRef.current = newSessionId;
      window.localStorage.setItem("sessionId", newSessionId);
      setSessionId(newSessionId);
    }

    try {
      setQr(null);
      setError(null);
      setIsLoading(true);

      const response = await fetch(
        `${apiPath}/api/auth?sessionId=${sessionIdRef.current}`,
        { mode: "no-cors" }
      );

      setQr(await response.json());
      setIsLoading(false);
    } catch (err) {
      const readableErr = readableError(err);
      setError(readableErr);
      setIsLoading(false);
    }
  };

  const checkAuth = async () => {
    try {
      const response = await fetch(
        `${apiPath}/api/auth?sessionId=${sessionId}&isGetData=true`,
        { mode: "no-cors" }
      );

      const data = await response.json();

      const token = data.body;

      const newUser = jwt.decode(token) as IUser;

      setUser(newUser);
    } catch (error) {}
  };

  const clearSessionId = () => {
    window.localStorage.removeItem("sessionId");
    setSessionId(null);
    setQr(null);
    setUser(null);
  };

  React.useEffect(() => {
    if (!qr) return;

    const intervalId = setInterval(async () => {
      try {
        const response = await fetch(
          `${apiPath}/api/auth?sessionId=${sessionId}&isGetData=true`,
          { mode: "no-cors" }
        );

        const data = await response.json();

        const token = data.body;

        const newUser = jwt.decode(token) as IUser;

        setUser(newUser);

        if (newUser) {
          setIsConnected(true);
          clearInterval(intervalId);
        }
      } catch (error) {}
    }, 500);

    return () => {
      clearInterval(intervalId);
    };
  }, [qr]);

  return {
    sessionId,
    getQr,
    qr,
    qrState: { isLoading, error },
    isConnected,
    checkAuth,
    clearSessionId,
    user,
  };
};
