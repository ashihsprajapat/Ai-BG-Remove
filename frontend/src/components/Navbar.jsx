

import React, { useEffect } from 'react'
import { assets } from './../assets/assets';
import { Link, useLocation } from 'react-router-dom';
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { useAppContext } from '../context/appContext';

const Navbar = () => {

    const { openSignIn } = useClerk()
    const { user, isSignedIn } = useUser()
    const { loadCreditsData, credits } = useAppContext()

    const { pathname } = useLocation()

    useEffect(() => {
        if (isSignedIn) {
            loadCreditsData()
        }
    }, [isSignedIn])

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
                    <div className='flex  items-center gap-2 sm:gap-3'>
                        <button className=' items-center gap-2 px-2 rounded-full hover:scale-105 duration-700 transition-all sm:px-7  bg-blue-100 py-1.5 sm:py-2.5  flex '>
                            <img src={assets.credit_icon} alt="" className='w-5 ' />
                            <p className='text-xs sm:text-sm text-gray-600 font-medium  '> Credits : {credits}</p>
                        </button>
                        <p className='text-gray-600 max-sm:hidden'>  Hi, {user.fullName}</p>
                        <UserButton />
                    </div>
                    :
                    <button
                        onClick={() => openSignIn({})}
                        type="button"
                        className="bg-black flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 
                        text-white text-sm sm:text-base font-medium rounded-full
                        border border-gray-300 shadow-sm
                        hover:bg-gray-800 hover:gap-4 sm:hover:gap-5
                        active:scale-95 
                        transition-all duration-300
                        w-32 sm:w-40 md:w-44
                        h-10 sm:h-11 md:h-12"
                    >
                        <span className="whitespace-nowrap">Get Started</span>
                        <img
                            src={assets.arrow_icon}
                            alt="arrow"
                            className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
                        />
                    </button>
            }

        </nav>
    )
}

export default Navbar
