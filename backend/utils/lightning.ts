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
      return invoice;
    } catch (error) {
      throw error;
    }
  }
};

export const LookupInvoice = async (
  server: string,
  cert: string,
  macaroon: string,
  hash: string
) => {
  const rpc = await TestConnection(server, cert, macaroon);
  if (rpc) {
    try {
      const invoice = await rpc.lookupInvoice({ rHash: hash });
      return invoice;
    } catch (error) {
      console.log(error);
    }
  }
};
