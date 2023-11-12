import { Client, Databases } from "appwrite";
import { ethers } from "ethers";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export const GET: NextApiHandler = async (req, res) => {
  const { address, message, hash, url } = req.query as {
    [key: string]: string;
  };

  if (!address) return res.status(400).send({ message: "No address provided" });
  if (!message) return res.status(400).send({ message: "No message provided" });
  if (!hash) return res.status(400).send({ message: "No hash provided" });
  if (!url) return res.status(400).send({ message: "No url provided" });

  // console.log(url);

  const signedAddress = ethers.utils.verifyMessage(message, hash);

  if (address !== signedAddress)
    return res.status(400).send({ message: "Wrong address provided" });

  let data: any;

  const DATABASE_ID = "64b6e7999463ec23c889";
  const COLLECTION_ID = "64b6e7a123e43e1fdd01";
  const client = new Client();
  client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("64a4422fbbc5ef0443f5");

  const { documents } = await new Databases(client).listDocuments(
    DATABASE_ID,
    COLLECTION_ID
  );

  const apiKey = documents.find((doc) => doc.key === "api-key")!.value;
  const clientId = documents.find((doc) => doc.key === "client-id")!.value;
  const apiPath = documents.find((doc) => doc.key === "api-path")!.value;

  const fullPath = `${apiPath}/${url.replaceAll(":AMP:", "&")}`;

  if (url.includes("linea"))
    return await lineaResponse(req, res, apiKey, clientId, apiPath);

  // const startTime = performance.now();

  const response = await fetch(fullPath, {
    // @ts-ignore
    timeout: 999999,
    headers: {
      "X-API-Key": apiKey,
      "X-ClientId": clientId,
    },
  });

  // const endTime = performance.now();

  // const time = Math.floor(endTime - startTime);

  // console.log(Math.floor(endTime - startTime));

  try {
    data = await response.json();
  } catch (error) {
    // console.log(error);

    data = {
      succeeded: false,
      messages: [`${response.status}: ${response.statusText}`],
    };
  }

  // console.log(data);

  // if (data.succeeded) {
  //   const {} = await new Databases(client).createDocument(
  //     DATABASE_ID,
  //     "64f65267e74786ad11d6",
  //     `${new Date().getTime()}`,
  //     {
  //       value: time,
  //     }
  //   );
  // }

  return res.status(response.status).send(data);
};

const lineaResponse = async (
  req: NextApiRequest,
  res: NextApiResponse<any>,
  apiKey: string,
  clientId: string,
  apiPath: string
) => {
  // @ts-ignore
  const { address, message, hash, url } = req.query as {
    [key: string]: string;
  };

  const { isHolder, updated_ms } = (await (
    await fetch(`https://nomis.cc/api/linea/holder?address=${address}`)
  ).json()) as { isHolder: boolean; updated_ms: number };

  const now = new Date().getTime();
  const month = 1000 * 60 * 60 * 24 * 30;
  const isHolderInLastMonth = updated_ms ? now - updated_ms < month : false;

  const fullPath = `${apiPath}/${url.replaceAll(":AMP:", "&")}`;

  let data: any;

  const response = await fetch(fullPath, {
    // @ts-ignore
    timeout: 999999,
    headers: {
      "X-API-Key": apiKey,
      "X-ClientId": clientId,
    },
  });
  try {
    data = await response.json();
  } catch (error) {
    // console.log(error);

    data = {
      succeeded: false,
      messages: [`${response.status}: ${response.statusText}`],
    };
  }

  if (isHolder && isHolderInLastMonth)
    return res.status(response.status).send(data);

  const {
    stats: { totalTransactions, noData },
    score,
    ...rest
  } = data.data;

  if (noData) return res.status(response.status).send(data);

  return res.status(response.status).send({
    ...data,
    data: {
      ...rest,
      stats: {
        noData,
        totalTransactions,
        statsDescriptions: {
          TotalTransactions: {
            label: "Total transactions",
            description: "Total transactions on wallet",
            units: "number",
          },
        },
      },
    },
  });
};
