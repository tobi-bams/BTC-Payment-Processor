import axios from "axios";

export const ElectrsCaller = async (method: string, argument: any) => {
  try {
    const response = await axios.post("http://127.0.0.1:50001");
    console.log(response);
  } catch (error: any) {
    console.log(error);
  }
};

export const BitcoinAddressChecker = async (address: string) => {
  try {
    const response = await axios.get(
      `https://blockstream.info/testnet/api/address/${address}/utxo`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
