import Card from "../components/ui/Card"
import { useContext, useState, useEffect } from "react"
import AuthContext from "../context/auth-context";

function GettingStartedPage() {

    const authCtx = useContext(AuthContext)
    const [userStore, setUserHasStore] = useState(false);

    useEffect(() => {
        // check for store in localstorage
        const checkStore = () => {
            const userHasStore = !!authCtx.currentUser.data.store;
            setUserHasStore(userHasStore);
        };

        checkStore();
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
            <div className="my-6">
                <Card
                    title="Connect your BTC wallet"
                    text="Add your xPub key from which recieving addresses will be generated"
                    buttonText="Add xPub key"
                    buttonLink="/dashboard/wallets/bitcoin"
                />
            </div>
            <div className="my-6">
                <Card
                    title="Connect to a lightning node"
                    text="Configure BPP to communicate with your lnd node via REST proxy"
                    buttonText="Connect lnd node"
                    buttonLink="/dashboard/wallets/lightning"
                />
            </div>
            <div className="my-3">
                <Card
                    title="Create Invoice"
                    text="Create your first invoice and start getting paid"
                    buttonText="Create invoice"
                    buttonLink="/dashboard/invoices"
                />
            </div>
        </div>

    )
}

export default GettingStartedPage;