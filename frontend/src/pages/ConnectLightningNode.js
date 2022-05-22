import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "../components/ui/Button";
import FormGroup from "../components/ui/FormGroup";

const ConnectLightningPage = () => {

    const [isLoading, setIsLoading] = useState(false)

    const history = useHistory();

    const serverInputRef = React.createRef();
    const macaroonInputRef = React.createRef();
    const certInputRef = React.createRef();

    const userToken = localStorage.getItem('token');

    const userStore = JSON.parse(localStorage.getItem('storeData')) || [];

    function submitHandler(event) {
        event.preventDefault();

        const enteredServer = serverInputRef.current.value;
        const enteredMacaroon = macaroonInputRef.current.value;
        const enteredCert = certInputRef.current.value;

        setIsLoading(true);

        fetch("http://localhost:5000/wallet/create-lightning/" + userStore.data.uuid,
            {
                method: 'POST',
                body: JSON.stringify({
                    server: enteredServer,
                    macaroon: enteredMacaroon,
                    cert: enteredCert
                }),
                headers: {
                    'Content-Type': 'application/json',
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
                history.replace("/dashboard/wallets");
            })
            .catch(err => {
                alert(err.message);
            });
    }

    return (
        <>
            <div className="mb-10">
                <h1 className="text-3xl text-dark font-bold mb-4">Connect Lightning Node</h1>
                <p>Before starting, please convert your node's admin.macaroon file and tls.cert file to hex format and paste the strings in their respective fields below.  </p>

                <form className="w-full mx-auto text-center" onSubmit={submitHandler}>
                    <FormGroup>
                        <input className="w-full border border-gray-300 rounded-sm px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400" type="text" id="server" ref={serverInputRef} placeholder="Server IP:PORT" required />
                    </FormGroup>
                    <FormGroup>
                        <textarea className="w-full border border-gray-300 rounded-sm px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400" rows="4" id="macaroon" ref={macaroonInputRef} placeholder="admin.macaroon" required />
                    </FormGroup>
                    <FormGroup>
                        <textarea className="w-full border border-gray-300 rounded-sm px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400" rows="4" id="cert" ref={certInputRef} placeholder="tls.cert" required />
                    </FormGroup>
                    <FormGroup>
                        {!isLoading && <Button className="mb-2" type="primary" text="Connect to node" full submit></Button>}
                        {isLoading && <div className="w-full px-6 py-3 rounded-sm border text-gray-800 bg-gray-200 border-gray-300" role="alert">Connecting...</div>}
                    </FormGroup>
                </form>

                <Button text="Go back" type="link" size="sm" onClick={history.goBack} />
            </div>

        </>
    )
}

export default ConnectLightningPage;