import React, { useContext } from "react"
import { Link } from 'react-router-dom'

import Avatar from "../components/ui/Avatar"
import AuthContext from "../store/auth-context";

function NavBar() {
    const authCtx = useContext(AuthContext);

    const isLoggedIn = authCtx.isLoggedIn;
    return (
        <div className="flex flex-col sm:flex-row sm:h-20 px-6 border-b border-gray-300 bg-white relative z-50">
            <div className="h-20 w-full flex items-center justify-between sm:h-auto">

                <Link to="/">
                    BTC Payment Processor
                </Link>

                <div className="items-center flex">
                    {!isLoggedIn && (
                        <Link className="no-underline px-2 mr-3 text-gray-200 font-medium hover:text-blue-400" to="/auth">
                            Go to dashboard
                        </Link>
                    )}
                    {isLoggedIn && (
                        <Avatar image="https://unavatar.io/rukundocollin@gmail.com" className="cursor-pointer my-2 ml-6"
                            status="online"
                            statusBottom />)}
                </div>
            </div>
        </div>
    )
}

export default NavBar;