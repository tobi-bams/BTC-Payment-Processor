import { useState, useContext } from "react"
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faHome,
    faBars,
    faTimes,
    faStore,
    faWallet,
    faBitcoinSign,
    faBoltLightning,
    faFileInvoice,
    faPlusCircle,
    faCogs,
    faCheckCircle,
} from "@fortawesome/free-solid-svg-icons"
import Avatar from "../components/ui/Avatar"
import AuthContext from "../context/auth-context"

const SideNav = () => {

    const authCtx = useContext(AuthContext);

    const currentUser = JSON.parse(localStorage.getItem('user'));

    let storeName;

    const localStore = JSON.parse(localStorage.getItem('storeData'));

    const userStore = currentUser.data.store;

    // get store name
    if (localStore) {
        storeName = localStore.data.name;
    }
    else if (userStore) {
        storeName = userStore.name;
    }

    const logoutHandler = () => {
        authCtx.logout();
    }

    const [mobileOpen, setMobileOpen] = useState(false)
    let navClass =
        "w-72 max-w-full bg-white h-screen flex flex-col text-white fixed lg:absolute lg:sticky top-0 transition-transform transform duration-500 ease"
    if (mobileOpen) navClass += " translate-x-0"
    else navClass += " -translate-x-full lg:translate-x-0"

    return (
        <div className={navClass}>
            <FontAwesomeIcon
                icon={mobileOpen ? faTimes : faBars}
                onClick={() => setMobileOpen(!mobileOpen)}
                className="absolute right-0 transform translate-x-double top-0 mt-8 text-3xl text-blue-800 cursor-pointer lg:hidden"
            />
            <Link className="no-underline block mt-6 mx-auto text-dark text-xl" to='/dashboard/overview'>
                Bitcoin Payment Processor
            </Link>
            <div className="flex-1 mt-8">
                <div className="px-8 py-3 bg-primary shadow">
                    <h2 className="text-lg text-white"><FontAwesomeIcon icon={faStore} /> {storeName}</h2>
                </div>
                <Link className='flex justify-between border-b border-secondary no-underline w-full px-8 py-6 transition-colors duration-200 ease-in-out text-dark hover:text-secondary' to='/dashboard/overview'>
                    <div>
                        <FontAwesomeIcon icon={faHome} className="mr-4" /> Dashboard
                    </div>
                </Link>
                <div className='no-underline border-b border-secondary w-full px-8 py-6 transition-colors duration-200 ease-in-out text-dark hover:text-secondary'>
                    <FontAwesomeIcon icon={faWallet} className="mr-4" /> Wallets
                    <ul>
                        <li>
                            <Link className='flex justify-between no-underline w-full px-8 py-2 transition-colors duration-200 ease-in-out text-dark hover:text-secondary' to='/dashboard/wallets/bitcoin'>
                                <div>
                                    <FontAwesomeIcon icon={faBitcoinSign} className="mr-4" /> Bitcoin <FontAwesomeIcon icon={faCheckCircle} color="#9fba24" className="mr-4" />
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link className='flex justify-between no-underline w-full px-8 py-2 transition-colors duration-200 ease-in-out text-dark hover:text-secondary' to='/dashboard/wallets/lightning'>
                                <div>
                                    <FontAwesomeIcon icon={faBoltLightning} className="mr-4" /> Lightning <FontAwesomeIcon icon={faCheckCircle} color="#9fba24" className="mr-4" />
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link className='flex justify-between no-underline w-full px-8 py-2 transition-colors duration-200 ease-in-out text-dark hover:text-secondary' to='/dashboard/wallets/'>
                                <div>
                                    <FontAwesomeIcon icon={faCogs} className="mr-4" /> Settings
                                </div>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className='no-underline w-full px-8 py-6 transition-colors duration-200 ease-in-out text-dark hover:text-secondary' to='/dashboard/invoices'>
                    <FontAwesomeIcon icon={faFileInvoice} className="mr-4" /> Invoices
                    <ul>
                        <li>
                            <Link className='flex justify-between no-underline w-full px-8 py-2 transition-colors duration-200 ease-in-out text-dark hover:text-secondary' to='/dashboard/invoices/new'>
                                <div>
                                    <FontAwesomeIcon icon={faPlusCircle} className="mr-4" /> New invoice
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link className='flex justify-between no-underline w-full px-8 py-2 transition-colors duration-200 ease-in-out text-dark hover:text-secondary' to='/dashboard/invoices'>
                                <div>
                                    <FontAwesomeIcon icon={faFileInvoice} className="mr-4" /> All invoices
                                </div>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div >
            <div className="flex px-8 py-6 items-center">
                <Avatar image={`https://unavatar.io/${currentUser.data.email}?fallback=https://source.boringavatars.com/beam/120/1337_user?colors=252746,4564BE,59ACCC`} />
                <div className="flex-1 ml-4">
                    <p className="font-medium text-black leading-none">{currentUser.data.email}</p>
                    <Link className='no-underline text-xs text-red-600 leading-none' to="/" onClick={logoutHandler}>
                        Logout
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SideNav;