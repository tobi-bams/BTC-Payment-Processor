import BitcoinxPubForm from "../components/forms/BitcoinxPubForm";
import { useHistory } from 'react-router-dom';

function CreateBitcoinWalletPage() {

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

    return (
        <div className="w-5/6 sm:w-2/3 my-12 py-6 px-6 shadow mx-auto rounded-sm text-center">
            <h1 className="text-3xl font-bold text-primary">Enter your extended public key</h1>
            <small>This key, also called "xpub", is used to generate individual destination addresses for your invoices.  </small>
            <BitcoinxPubForm onEnteredXpub={xPubInputHandler} />
        </div>

    );
}

export default CreateBitcoinWalletPage;