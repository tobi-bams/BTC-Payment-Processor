import createLnRpc from "@radar/lnrpc";

export const TestConnection = async (
  server: string,
  cert: string,
  macaroon: string
) => {
  try {
    const rpc = await createLnRpc({
      server,
      cert: Buffer.from(cert, "hex").toString("utf-8"),
      macaroon,
    });

    console.log(await rpc.getInfo());
  } catch (error) {
    console.log(error);
  }
};
