

import React from 'react'
import { assets } from './../assets/assets';
import { Link } from 'react-router-dom';
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {
    const { openSignIn } = useClerk()
    const { user, isSignedIn } = useUser()
    console.log(user)
    return (
        <nav className="h-[60px] md:h-[70px] w-full px-4 md:px-12 lg:px-24 xl:px-32 flex items-center justify-between z-20 bg-white text-gray-700 shadow-[0px_4px_25px_0px_#0000000D] transition-all">
            <Link to="/" className="text-indigo-600">
                <img
                    src={assets.logo}
                    alt=""
                    className="w-[120px] md:w-[180px] lg:w-[200px] transition-all"
                />
            </Link>
            {
                isSignedIn ?
                <div>
                    Hello,{user.firstName}
                    <UserButton />
                </div>
                    :
                    <button
                        onClick={() => openSignIn({})}
                        type="button"
                        className="bg-black flex gap-2 md:gap-4 items-center px-3 py-2 md:p-4 text-white border border-gray-300 text-xs md:text-sm lg:text-base hover:bg-gray-800 hover:gap-4 md:hover:gap-6 cursor-pointer active:scale-95 transition-all w-28 md:w-36 lg:w-40 h-9 md:h-11 rounded-full"
                    >
                        Get started
                        <img src={assets.arrow_icon} alt="" className="w-4 h-5 md:w-5 md:h-7" />
                    </button>
            }

        </nav>
    )
}

export default Navbar
