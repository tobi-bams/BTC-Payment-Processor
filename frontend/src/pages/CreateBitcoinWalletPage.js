import { useMemo, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import {
  addressesFromExtPubKey,
  isValidExtPubKey,
} from "@swan-bitcoin/xpub-lib";
import { DerivedAddressesTable } from "../components/bitcoin/derivedAddressesTable";
import { ExtPubKeyInput } from "../components/bitcoin/xpubInput";
import AuthContext from "../context/auth-context";
import Swal from "sweetalert2";

const NUMBER_OF_ADDRESSES = 10; // however many we need

const CreateBitcoinWalletPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);

  const history = useHistory();
  const userToken = localStorage.getItem("token");

  let store_id;

  const localStore = JSON.parse(localStorage.getItem("storeData"));

  const currentUser = JSON.parse(localStorage.getItem("user"));

  if (localStore) {
    store_id = localStore.data.uuid;
  } else if (currentUser.data.store) {
    store_id = currentUser.data.store.id;
  }

  function xPubInputHandler(xpub) {
    setIsLoading(true);

    fetch("http://localhost:5000/wallet/create-bitcoin/" + store_id, {
      method: "POST",
      body: JSON.stringify({
        xpub: xpub,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMsg = "Failed to save xpub!";
            throw new Error(errorMsg);
          });
        }
      })
      .then((data) => {
        setTimeout(async () => {
          await authCtx.storeUser(userToken);
          setIsLoading(false);
          Swal.fire({
            title: "Wallet",
            text: "Bitcoin Watch only wallet Created Successfully",
            icon: "success",
            confirmButtonText: "Close",
            timer: 5000,
          });
          history.replace("/dashboard/getting-started");
        }, 2000);
      })
      .catch((err) => {
        setIsLoading(false);
        Swal.fire({
          title: "Wallet",
          text: err.message,
          icon: "error",
          confirmButtonText: "Close",
          timer: 5000,
        });
      });
  }

  const network = "testnet";
  const [extPubKey, setExtPubKey] = useState("");
  const handleExtPubKeyChange = (e) => setExtPubKey(e.target.value);

  const isValid = useMemo(
    () => isValidExtPubKey(extPubKey, network),
    [extPubKey, network]
  );

  const addressList = isValid
    ? addressesFromExtPubKey({
        extPubKey,
        addressCount: NUMBER_OF_ADDRESSES,
        network,
      })
    : [];

  return (
    <>
      <div className="mb-10">
        <h1 className="text-3xl text-dark font-bold mb-4">Bitcoin Wallet</h1>
        <p>
          Connect your Bitcoin Wallet to your store through your extended public
          key. All recieving addresses will stem from this key.{" "}
        </p>

        <ExtPubKeyInput
          extPubKey={extPubKey}
          network={network}
          onChange={handleExtPubKeyChange}
          onEnteredXpub={xPubInputHandler}
        />
        {isLoading && (
          <div
            className="w-full px-6 py-3 rounded-sm border text-gray-800 bg-gray-200 border-gray-300"
            role="alert"
          >
            Setting up your BTC wallet...
          </div>
        )}
      </div>
      <div className="mb-10">
        <DerivedAddressesTable
          network={network}
          extPubKey={extPubKey}
          addressList={addressList}
          showCount="10"
        />
      </div>
    </>
  );
};

export default CreateBitcoinWalletPage;
