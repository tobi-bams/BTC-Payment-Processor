import React, { useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { addressesFromExtPubKey, isValidExtPubKey } from "@swan-bitcoin/xpub-lib";
import { DerivedAddressesTable } from "../components/bitcoin/derivedAddressesTable";
import { ExtPubKeyInput } from "../components/bitcoin/xpubInput";

const DEFAULT_NETWORK = "mainnet"
const NUMBER_OF_ADDRESSES = 10 // however many we need

const WalletPage = () => {

    const history = useHistory();
    const userToken = localStorage.getItem('token');

    const currentUser = JSON.parse(localStorage.getItem('user')) || [];

    const userStore = currentUser.data.store.id;

    function xPubInputHandler(xpub) {
        fetch("http://localhost:5000/wallet/create-bitcoin/" + userStore,
            {
                method: 'POST',
                body: JSON.stringify(xpub),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                }
            }).then(() => {
                // @todo: update user json in storage: logging in is required first currently.

                // if fetch promise fulfilled, navigate back to landing page
                history.replace('/dashboard/wallets');
            });
    }

    const [network, setNetwork] = useState(DEFAULT_NETWORK)
    const [extPubKey, setExtPubKey] = useState("")
    const handleExtPubKeyChange = (e) => setExtPubKey(e.target.value)

    const isValid = useMemo(() => isValidExtPubKey(extPubKey, network), [
        extPubKey,
        network,
    ])

    const addressList = isValid
        ? addressesFromExtPubKey({
            extPubKey,
            addressCount: NUMBER_OF_ADDRESSES,
            network,
        })
        : []

    return (
        <>
            <div className="mb-10">
                <h1 className="text-3xl text-dark font-bold mb-4">Bitcoin Wallet</h1>
                <p>Connect your Bitcoin Wallet to your store through your extended public key. All recieving addresses will stem from this key. </p>

                <ExtPubKeyInput
                    extPubKey={extPubKey}
                    network={network}
                    onChange={handleExtPubKeyChange}
                    onEnteredXpub={xPubInputHandler}
                />
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
    )
}

export default WalletPage;