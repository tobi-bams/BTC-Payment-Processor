import axios from "axios";

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

export const BtcExchangeValue = async () => {
  try {
    const amount = await axios.get(
      "https://api-pub.bitfinex.com/v2/tickers?symbols=tBTCUSD"
    );
    return amount.data[0][7];
  } catch (error) {
    console.log(error);
  }
};

export const PriceConverter = (exchangeRage: number, price: number) => {
  const btc = parseFloat((price / exchangeRage).toFixed(8));
  const sats = Number(btc * 100000000);
  return { btc, sats };
};
