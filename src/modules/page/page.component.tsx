import type { NextPage } from "next";
import { Providers } from "../../lib";
import { Layout } from "../../components";
import { User } from "../user";
import { Data } from "../data";
import { useScoreStore } from "../../hooks";
import React from "react";
import { FormModal } from "../form-modal";
import Head from "next/head";
import { useSearchParams } from "next/navigation";

export const Page: NextPage = () => {
  const setReferral = useScoreStore((state) => state.setReferral);
  const searchParams = useSearchParams();

  React.useEffect(() => {
    const ref = searchParams.get("ref");
    if (!ref) return;

    setReferral(ref);
  }, [searchParams, setReferral]);

  return (
    <>
      <Head>
        <meta property="og:title" content="opBNB Reputation Score" />
        <meta
          property="og:description"
          content="Reputation Score allows you to assess and leverage your
onchain reputation by minting it as an SBT."
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="opBNB Reputation Score" />
        <meta
          property="twitter:description"
          content="Reputation Score allows you to assess and leverage your
onchain reputation by minting it as an SBT."
        />
      </Head>
      <Providers>
        <Layout>
          <Data />
          <User />
        </Layout>
        <FormModal />
      </Providers>
    </>
  );
};
