import React, { useState } from "react"
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faHome,
    faBars,
    faTimes,
    faBoxArchive,
    faBriefcase
} from "@fortawesome/free-solid-svg-icons"

import Button from "../components/ui/Button"
import Avatar from "../components/ui/Avatar"

function SideNav() {
    const [mobileOpen, setMobileOpen] = useState(false)
    let navClass =
        "w-72 max-w-full bg-white-800 h-screen flex flex-col text-white fixed lg:absolute lg:sticky top-0 transition-transform transform duration-500 ease"
    if (mobileOpen) navClass += " translate-x-0"
    else navClass += " -translate-x-full lg:translate-x-0"
    return (
        <div className={navClass}>
            <FontAwesomeIcon
                icon={mobileOpen ? faTimes : faBars}
                onClick={() => setMobileOpen(!mobileOpen)}
                className="absolute right-0 transform translate-x-double top-0 mt-8 text-3xl text-blue-800 cursor-pointer lg:hidden"
            />
            <Link className="no-underline block mt-6 mx-auto text-black text-xl" to='/'>
                Bitcoin Payment Processor
            </Link>
            <div className="flex-1 mt-8">
                <div className="px-8">
                    <Link to='/dashboard/create-store'>
                        <Button text="Create store" size="sm" type="secondary" full />
                    </Link>
                </div>
                <div className="mt-6">
                    <Link className='flex justify-between no-underline w-full px-8 py-3 border-l-4 transition-colors duration-200 ease-in-out text-black hover:text-blue-400 border-blue-400' to='/dashboard'>
                        <div>
                            <FontAwesomeIcon icon={faHome} className="mr-4" /> Dashboard
                        </div>
                    </Link>
                    <Link className='flex justify-between no-underline w-full px-8 py-3 border-l-2 border-transparent transition-colors duration-200 ease-in-out text-black hover:text-blue-400' to='/dashboard/products'>
                        <div>
                            <FontAwesomeIcon icon={faBoxArchive} className="mr-4" /> Products
                        </div>
                    </Link>
                    <Link className='flex justify-between no-underline w-full px-8 py-3 border-l-2 border-transparent transition-colors duration-200 ease-in-out text-black hover:text-blue-400' to='/dashboard/transactions'>
                        <div>
                            <FontAwesomeIcon icon={faBriefcase} className="mr-4" /> Transactions
                        </div>
                    </Link>
                </div>
            </div>
            <div className="flex px-8 py-6 items-center">
                <Avatar image="https://unavatar.io/rukundocollin@gmail.com" />
                <div className="flex-1 ml-4">
                    <p className="font-medium text-black leading-none">Qala</p>
                    <Link className='no-underline text-xs text-gray-300 leading-none' to='/'>
                        Edit Profile
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SideNav;