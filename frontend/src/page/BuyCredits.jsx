
import React from 'react'
import { plans } from '../assets/assets'

function BuyCredits() {
    return (
        <div className='text-center mt-20'>
            <button className='border mb-10 text-sm rounded-2xl px-5 py-1 mx-auto'>OUR PLANS</button>
            <h1 className='text-center text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl'>Choose the plan that's right for you</h1>
            <div className='grid grid-cols-1 gap-6 mx-10 px-20 sm:grid-cols-2 md:grid-cols-3 mt-20'>

                {
                    plans.map((plan, i) => (
                        <div className="p-6  rounded-lg  w-80 shadow-lg hover:scale-105 duration-300 cursor-pointer " key={i}>
                            <h3 className="text-xl font-bold">{plan.id}</h3>
                            <div className="my-2">
                                <span className="text-4xl font-bold">${plan.price}</span>
                                <span className="text-gray-700">/{plan.credits}credits</span>
                            </div>
                            <p className="text-gray-700 mb-6">Advanced features for professionals.</p>

                            <ul className="space-y-1.5 mb-6 text-sm">
                                <li className="flex items-center">
                                    <svg className="h-5 w-5 text-green-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-gray-700">{plan.desc}</span>
                                </li>

                            </ul>

                            <button className="w-full py-2 px-4 bg-black text-white rounded hover:bg-blue-600 transition-colors text-sm">
                                Get Started
                            </button>
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default BuyCredits
