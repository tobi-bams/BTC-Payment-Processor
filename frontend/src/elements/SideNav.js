import React, { useState, useContext, useEffect } from "react"
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
    faTimesCircle
} from "@fortawesome/free-solid-svg-icons"
import Avatar from "../components/ui/Avatar"
import AuthContext from "../context/auth-context"

function SideNav() {

    const [isLoading, setIsLoading] = useState(false)

    const authCtx = useContext(AuthContext);

    const hasBtcWallet = !!authCtx.currentUser?.data?.store?.wallet?.bitcoin
    const hasLightning = !!authCtx.currentUser?.data?.store?.wallet?.lightning

    const [user, setUser] = useState(null);
    const [userStore, setUserHasStore] = useState(false);
    const [store, setStore] = useState({});
    const [userWallet, setUserHasWallet] = useState(false);
    const [userLightning, setUserHasLightning] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        // check for store in localstorage
        const fetchUser = () => {

            const loggedInUser = authCtx.currentUser
            setUser(loggedInUser);
        };
        // check for store in localstorage

        const checkStore = () => {
            const userHasStore = !!authCtx.currentUser.data.store;
            if (userHasStore) {
                setUserHasStore(true);
                const store = authCtx.currentUser.data.store
                setStore(store);
            }
        };

        const checkWallet = () => {
            setUserHasWallet(hasBtcWallet);
        };

        const checkLightning = () => {
            setUserHasLightning(hasLightning);
        };

        fetchUser();
        checkStore();
        checkWallet();
        checkLightning();
        setIsLoading(false);
    });


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
                    {isLoading ? (
                        <p>Loading store...</p>
                    ) : (
                        <>
                            {userStore ? (
                                <h2 className="text-lg text-white"><FontAwesomeIcon icon={faStore} /> {store.name}</h2>
                            ) : (
                                <h2 className="text-lg text-white"><FontAwesomeIcon icon={faStore} /> My store name here</h2>
                            )}
                        </>
                    )}
                </div>
                {userStore ? (
                    <>
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
                                            <FontAwesomeIcon icon={faBitcoinSign} className="mr-4" /> Bitcoin {hasBtcWallet ? (
                                                <FontAwesomeIcon icon={faCheckCircle} color="#9fba24" className="mr-4" />
                                            ) : (
                                                <FontAwesomeIcon icon={faTimesCircle} color="#ff0000" className="mr-4" />
                                            )}
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link className='flex justify-between no-underline w-full px-8 py-2 transition-colors duration-200 ease-in-out text-dark hover:text-secondary' to='/dashboard/wallets/lightning'>
                                        <div>
                                            <FontAwesomeIcon icon={faBoltLightning} className="mr-4" /> Lightning {hasLightning ? (
                                                <FontAwesomeIcon icon={faCheckCircle} color="#9fba24" className="mr-4" />
                                            ) : (
                                                <FontAwesomeIcon icon={faTimesCircle} color="#ff0000" className="mr-4" />
                                            )}
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
                    </>
                ) : (
                    <span></span>
                )
                }
            </div >
            <div className="flex px-8 py-6 items-center">
                {isLoading && (
                    <p>loading user...</p>
                )}
                {!isLoading && (
                    <>
                        <Avatar image={`https://unavatar.io/${user?.data?.email}?fallback=https://source.boringavatars.com/beam/120/1337_user?colors=252746,4564BE,59ACCC`} />
                        <div className="flex-1 ml-4">
                            <p className="font-medium text-black leading-none">{user?.data?.email}</p>
                            <Link className='no-underline text-xs text-red-600 leading-none' to="/" onClick={logoutHandler}>
                                Logout
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default SideNav;