import Card from "../components/ui/Card"
import { useContext, useState, useEffect } from "react"
import AuthContext from "../context/auth-context";
import { useHistory } from "react-router-dom";

function GettingStartedPage() {

    const history = useHistory()

    const authCtx = useContext(AuthContext)

    const hasStore = !!authCtx.currentUser.data.store;
    const hasBtcWallet = !!authCtx.currentUser.data.store.wallet.bitcoin
    const hasLightning = !!authCtx.currentUser.data.store.wallet.lightning

    if (hasStore && hasBtcWallet && hasLightning) {
        history.replace("/dashboard/overview");
    }

    const [userStore, setUserHasStore] = useState(false);
    const [userWallet, setUserHasWallet] = useState(false);
    const [userLightning, setUserHasLightning] = useState(false);

    useEffect(() => {
        // check for store in localstorage
        const checkStore = () => {
            setUserHasStore(hasStore);
        };

        const checkWallet = () => {
            setUserHasWallet(hasBtcWallet);
        };

        const checkLightning = () => {
            setUserHasLightning(hasLightning);
        };

        checkStore();
        checkWallet();
        checkLightning();
    });

    return (
        <div className="mb-10">
            <h1 className="text-3xl text-dark font-bold mb-4">Welcome to BTC Payment Processor</h1>
            <h2 className="text-xl text-dark font-bold mb-4">Next steps?</h2>
            {!userStore &&
                <div className="my-6">
                    <Card
                        title="Create your store"
                        text="Your store is necessary before you can issue invoices"
                        buttonText="Create store"
                        buttonLink="/dashboard/create-store"
                    />
                </div>
            }
            {!userWallet &&
                <div className="my-6">
                    <Card
                        title="Connect your BTC wallet"
                        text="Add your xPub key from which recieving addresses will be generated"
                        buttonText="Add xPub key"
                        buttonLink="/dashboard/wallets/bitcoin"
                    />
                </div>
            }
            {!userLightning &&
                <div className="my-6">
                    <Card
                        title="Connect to a lightning node"
                        text="Configure BPP to communicate with your lnd node via REST proxy"
                        buttonText="Connect lnd node"
                        buttonLink="/dashboard/wallets/lightning"
                    />
                </div>
            }
        </div>

    )
}

export default GettingStartedPage;