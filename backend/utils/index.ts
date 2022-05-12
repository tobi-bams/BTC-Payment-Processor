interface ResBody {
  message: string;
  data?: {};
}
interface Res {
  status: number;
  body: ResBody;
}

export const ResponseHandler = (
  status: number,
  message: string,
  data?: {}
): Res => {
  return { status, body: { message, data } };
};

export const ValidateXpubKey = (xpub: string) => {
  // TODO
  // Validate Xpub Key
  return true;
};

export const ValidateMacaroon = (macaroon: string) => {
  return true;
};
