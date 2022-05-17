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
    return rpc;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const GenerateInvoice = async (
  server: string,
  cert: string,
  macaroon: string,
  value: number,
  description: string
) => {
  const rpc = await TestConnection(server, cert, macaroon);
  if (rpc) {
    try {
      const invoice = await rpc.addInvoice({
        value: value.toString(),
        memo: description,
      });
      const checker = await rpc.lookupInvoice({
        rHash: (invoice.rHash as Buffer).toString("base64"),
      });
      console.log(checker);
      return invoice;
    } catch (error) {
      throw error;
    }
  } else {
  }
};
