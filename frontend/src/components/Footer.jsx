

import React, { } from 'react'
import { useLocation } from 'react-router-dom'
import { assets } from '../assets/assets'


function Footer() {

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>

            <footer className="flex flex-col border-t mt-20 md:flex-row gap-3 items-center justify-around w-full py-4 text-sm  ">
                <div className='flex flex-col md:flex-row items-center gap-3'>
                    <img src={assets.logo} width={130} alt="" />
                    <div className="h-8 w-px bg-black hidden md:inline"></div>

                <p>Copyright © 2025 PrebuiltUI. All rights reservered.</p>
                </div>
                <div className="flex items-center gap-4">
                    <img className='cursor-pointer hover:scale-105' src={assets.facebook_icon} alt="" />
                    <img className='cursor-pointer hover:scale-105' src={assets.twitter_icon} alt="" />
                    <img className='cursor-pointer hover:scale-105' src={assets.google_plus_icon} alt="" />
                </div>
            </footer>
        </>
    )
}

export default Footer
