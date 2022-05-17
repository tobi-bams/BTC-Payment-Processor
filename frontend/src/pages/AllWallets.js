import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faCopy,
    faCheckCircle,
    faQrcode
} from "@fortawesome/free-solid-svg-icons"

function AllWalletsPage() {

    return (
        <div className="w-5/6 sm:w-2/3 my-12 py-6 px-6 shadow mx-auto rounded-sm">
            <h1 className="text-3xl font-bold text-primary">BTC Wallet Settings</h1>
            <div class="mt-2 border-t border-gray-300">
                <div class="px-4 py-6 flex flex-col sm:flex-row items-center justify-between cursor-pointer transition-colors duration-300 ease border-b border-gray-300 hover:bg-gray-200 no-underline">
                    <div class="mt-2 text-center sm:text-left sm:mt-0 sm:ml-4 flex-1">
                        <p class="font-medium">Watch only wallet</p>
                        <p class="">Active</p>
                    </div>
                    <FontAwesomeIcon icon={faCheckCircle} size="xl" color="#9fba24" className="mr-4" />
                </div>
                <div class="px-4 py-6 flex flex-col sm:flex-row items-center justify-between cursor-pointer transition-colors duration-300 ease border-b border-gray-300 hover:bg-gray-200 no-underline">
                    <div class="mt-2 text-center sm:text-left sm:mt-0 sm:ml-4 flex-1">
                        <p class="font-medium">Derivation scheme</p>
                        <p class="">xpub key</p>
                    </div>
                    <FontAwesomeIcon icon={faCopy} size="xl" color="#FFC145" className="mr-4" />
                </div>
                <div class="px-4 py-6 flex flex-col sm:flex-row items-center justify-between cursor-pointer transition-colors duration-300 ease border-b border-gray-300 hover:bg-gray-200 no-underline">
                    <div class="mt-2 text-center sm:text-left sm:mt-0 sm:ml-4 flex-1">
                        <p class="font-medium">Account key 0</p>
                        <p class="">xpub key</p>
                    </div>
                    <FontAwesomeIcon icon={faCopy} size="xl" color="#FFC145" className="mr-4" />
                    <FontAwesomeIcon icon={faQrcode} size="xl" className="mr-4" />
                </div>
            </div>
        </div>
    );
}

export default AllWalletsPage;