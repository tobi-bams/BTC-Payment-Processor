import { BIP32Factory } from "bip32";
import * as ecc from "tiny-secp256k1";
import { payments, networks } from "bitcoinjs-lib";

const bip32 = BIP32Factory(ecc);

const PublicKey = (xpub: string, path: string) => {
  try {
    const node = bip32.fromBase58(xpub, networks.testnet);
    const child = node.derivePath(path);
    return child;
  } catch (error) {
    throw error;
  }
};
export const deriveBitcoinAddress = (
  xpub: string,
  derivationPath: string,
  currentIndex: number
) => {
  const publicKey = PublicKey(xpub, `${derivationPath}${currentIndex}`);
  const address = payments.p2wpkh({
    pubkey: publicKey.publicKey,
    network: networks.testnet,
  });
  return address.address;
};
