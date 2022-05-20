import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faCopy,
    faBitcoinSign,
    faBoltLightning,
    faWallet
} from "@fortawesome/free-solid-svg-icons"
import Button from "../components/ui/Button";

const CheckoutBox = (props) => {

    return (
        <>
            <div className="text-center mt-4">
                <small>Scan with BIP21 enabled wallet</small>
                <img className="mx-auto my-6" src={props.qrcode.src} />
                <Button type="secondary" text="Open Wallet" full />
                <h2 className="text-primary text-left border-t pt-4"><FontAwesomeIcon icon={faBitcoinSign} /> Bitcoin address</h2>
                <div className="flex">
                    <input className="w-full border border-gray-400 text-dark p-4 focus:outline-none" type="text" defaultValue={props.bitcoin} readOnly />
                    <span className="flex items-center justify-center border border-gray-400 border-l-0 py-2 px-4 text-gray-800">
                        <FontAwesomeIcon icon={faCopy} size="lg" />
                    </span>
                    <span className="flex items-center justify-center border border-gray-400 border-l-0 py-2 px-4 text-gray-800">
                        <FontAwesomeIcon icon={faWallet} size="lg" />
                    </span>
                </div>
                <h2 className="text-primary text-left border-t pt-4"><FontAwesomeIcon icon={faBoltLightning} /> Bolt 11 invoice</h2>
                <div className="flex">
                    <input className="w-full border border-gray-400 text-dark p-4 focus:outline-none" type="text" defaultValue={props.lightning} readOnly />
                    <span className="flex items-center justify-center border border-gray-400 border-l-0 py-2 px-4 text-gray-800">
                        <FontAwesomeIcon icon={faCopy} size="lg" />
                    </span>
                    <span className="flex items-center justify-center border border-gray-400 border-l-0 py-2 px-4 text-gray-800">
                        <FontAwesomeIcon icon={faWallet} size="lg" />
                    </span>
                </div>
            </div>
        </>
    )
}

export default CheckoutBox;