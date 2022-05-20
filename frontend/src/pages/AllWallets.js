import { useContext, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faCopy,
    faCheckCircle,
    faQrcode
} from "@fortawesome/free-solid-svg-icons"
import AuthContext from "../context/auth-context"
import { useHistory } from "react-router-dom";
import Button from "../components/ui/Button";

function AllWalletsPage() {

    const history = useHistory();

    const [isLoading, setIsLoading] = useState(false);
    const [nodeStatus, setNodeStatus] = useState(false);

    const authCtx = useContext(AuthContext)

    const hasBtcWallet = !!authCtx.currentUser.data.store.wallet.bitcoin
    const hasLightning = !!authCtx.currentUser.data.store.wallet.lightning

    // check if lightning node is connected 

    const userToken = localStorage.getItem('token');

    const checkLightningStatus = (event) => {
        event.preventDefault();

        fetch("http://localhost:5000/wallet/light",
            {
                headers: {
                    'Authorization': `Bearer ${userToken}`
                }
            }).then((res) => {
                setIsLoading(false);
                if (res.ok) {
                    return res.json();

                } else {
                    return res.json().then(data => {
                        let errorMsg = 'Failed to connect!';
                        throw new Error(errorMsg);
                    });
                }
            }).then(data => {
                console.log(data);
                if (data.message == "We are good") {
                    setNodeStatus(true);
                }
                history.replace("/dashboard/wallets");
            })
            .catch(err => {
                alert(err.message);
            });
    }

    let connectionStatus = "Offline";
    if (nodeStatus == true) {
        connectionStatus = "Connected"
    }

    return (
        <div className="w-5/6 sm:w-2/3 my-12 py-6 px-6 shadow mx-auto rounded-sm">
            <h1 className="text-3xl font-bold text-primary">Wallets Status</h1>
            <div className="mt-2 border-t border-gray-300">
                <div className="px-4 py-6 flex flex-col sm:flex-row items-center justify-between cursor-pointer transition-colors duration-300 ease border-b border-gray-300 hover:bg-gray-200 no-underline">
                    <div className="mt-2 text-center sm:text-left sm:mt-0 sm:ml-4 flex-1">
                        <p className="font-medium">BTC Watch only wallet</p>
                        {hasBtcWallet ? (
                            <p className="">Active (xPub validated)</p>
                        ) : (
                            <p className="">Inactive</p>
                        )

                        }
                    </div>
                    <FontAwesomeIcon icon={faCheckCircle} size="xl" color="#9fba24" className="mr-4" />
                </div>
                <div className="px-4 py-6 flex flex-col sm:flex-row items-center justify-between cursor-pointer transition-colors duration-300 ease border-b border-gray-300 hover:bg-gray-200 no-underline">
                    <div className="mt-2 text-center sm:text-left sm:mt-0 sm:ml-4 flex-1">
                        <p className="font-medium">Lightning Node Status</p>
                        {isLoading && (
                            <p className="">checking connection...</p>
                        )}
                        {!isLoading && (
                            <p className="">{connectionStatus}</p>
                        )}
                    </div>
                    {isLoading && (
                        <p>checking node...</p>
                    )}
                    {!isLoading && (
                        <Button text="Check connection" type="secondary" size="xs" onClick={checkLightningStatus} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default AllWalletsPage;