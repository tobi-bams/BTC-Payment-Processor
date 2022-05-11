import React, { useContext } from "react"
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faLock
} from "@fortawesome/free-solid-svg-icons"
import Button from "../components/ui/Button";
import AuthContext from "../store/auth-context";

function NavBar() {

    const authCtx = useContext(AuthContext);

    return (
        <div className="flex flex-col sm:flex-row sm:h-20 px-6 border-b border-gray-300 bg-white relative z-50">
            <div className="h-20 w-full flex items-center justify-between sm:h-auto">

                <Link to="/">
                    BTC Payment Processor
                </Link>

                <div className="items-center flex">
                    {authCtx.isLoggedIn && (
                        <Button size="base" icon={<FontAwesomeIcon icon={faLock} />} text="Dashboard" link="/dashboard" />
                    )}
                    {!authCtx.isLoggedIn && (
                        <Button size="base" icon={<FontAwesomeIcon icon={faLock} />} text="Login" link="/auth" />
                    )}
                </div>
            </div>
        </div>
    )
}

export default NavBar;