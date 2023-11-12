import { Client, Databases } from "appwrite";
import React from "react";

const DATABASE_ID = "64af24cb16222185cc48";
const COLLECTION_ID = "64af24d07687fbb3229a";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("64a4422fbbc5ef0443f5");

const subscribeApiPath = "https://test.nomis.cc/api/v1/mail/subscriber";

const isDebug = false;

export const useEmailForm = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const send = async (email: string) => {
    try {
      if (email === "") throw new Error("Email can not be blank");

      setError(null);
      setIsLoading(true);

      const id = `${Math.random().toFixed(36)}`.replaceAll("0.", "");

      const response = await fetch(subscribeApiPath, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ contactEmail: email }),
      });

      // isDebug && console.log("subscription: ", await response.json());

      await new Databases(client).createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        id,
        {
          email,
          from: "zksync",
        }
      );

      setIsSuccess(true);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (isSuccess)
      setTimeout(() => {
        setIsSuccess(false);
      }, 1500);
    if (error)
      setTimeout(() => {
        setError(null);
      }, 1500);
  }, [isSuccess, error]);

  return { isLoading, error, isSuccess, send };
};
