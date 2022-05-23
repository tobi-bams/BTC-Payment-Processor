import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faCopy,
    faBitcoinSign,
    faBoltLightning,
    faWallet
} from "@fortawesome/free-solid-svg-icons"
import Button from "../components/ui/Button";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";

const CheckoutBox = (props) => {

    const copyAction = (event) => {
        event.target.innerHTML = 'Copied';
        setTimeout(() => {
            event.target.innerHTML = 'Copy';
        }, 3000);
    };

    return (
        <>
            <div className="text-center">
                <p className="text-gray-600">Scan with BIP21-enabled wallet</p>
                <img className="mx-auto my-4" src={props.qrcode.src} />
                <Button type="secondary" text="Open Wallet" size="sm" full />
                <h2 className="text-primary text-left pt-4"><FontAwesomeIcon icon={faBitcoinSign} /> Bitcoin address</h2>
                <div className="flex">
                    <input className="w-full border border-gray-400 text-dark px-2 py-2 focus:outline-none" type="text" defaultValue={props.bitcoin} readOnly />
                    <span className="flex items-center justify-center border border-gray-400 border-l-0 px-2 text-gray-800">
                        <CopyToClipboard text={props.bitcoin}>
                            <Button type="secondary" text="Copy" className="copy-button" size="xs" onClick={copyAction}>
                                <FontAwesomeIcon icon={faCopy} />
                            </Button>
                        </CopyToClipboard>
                    </span>
                    <span className="flex items-center justify-center border border-gray-400 border-l-0 py-2 px-4 text-gray-800">
                        <Link target="_blank" to={`/bitcoin: ${props.bitcoin}`}>
                            <FontAwesomeIcon icon={faWallet} style={{ cursor: "pointer" }} />
                        </Link>
                    </span>
                </div>
                <h2 className="text-primary text-left border-t pt-4"><FontAwesomeIcon icon={faBoltLightning} /> BOLT 11 invoice</h2>
                <div className="flex">
                    <input className="w-full border border-gray-400 text-dark px-2 py-2 focus:outline-none" type="text" defaultValue={props.lightning} readOnly />
                    <span className="flex items-center justify-center border border-gray-400 border-l-0 py-2 px-4 text-gray-800">
                        <CopyToClipboard text={props.lightning}>
                            <Button type="secondary" text="Copy" className="copy-button" size="xs" onClick={copyAction}>
                                <FontAwesomeIcon icon={faCopy} />
                            </Button>
                        </CopyToClipboard>
                    </span>
                    <span className="flex items-center justify-center border border-gray-400 border-l-0 py-2 px-4 text-gray-800">
                        <Link target="_blank" to={`/lightning: ${props.lightning}`}>
                            <FontAwesomeIcon icon={faWallet} style={{ cursor: "pointer" }} />
                        </Link>
                    </span>
                </div>
            </div>
        </>
    )
}

export default CheckoutBox;