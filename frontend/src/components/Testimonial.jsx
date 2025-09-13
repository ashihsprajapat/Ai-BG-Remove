
import React from 'react'
import { assets, testimonialsData } from './../assets/assets';

function Testimonial() {
    console.log(testimonialsData)
    return (
        <div className='text-center mt-3'>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">What Our Students Say</h1>
            <div className='flex flex-wrap justify-center gap-5 mt-16 text-left'>


                {
                    testimonialsData.map((test, i) => (
                        <div className="w-80 flex flex-col items-start border border-gray-200 p-5 rounded-lg bg-white">
                            <svg width="20" height="40" viewBox="0 0 44 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M33.172 5.469q2.555 0 4.547 1.547a7.4 7.4 0 0 1 2.695 4.007q.47 1.711.469 3.61 0 2.883-1.125 5.86a22.8 22.8 0 0 1-3.094 5.577 33 33 0 0 1-4.57 4.922A35 35 0 0 1 26.539 35l-3.398-3.398q5.296-4.243 7.218-6.563 1.946-2.32 2.016-4.617-2.86-.329-4.781-2.461-1.923-2.133-1.922-4.992 0-3.117 2.18-5.297 2.202-2.203 5.32-2.203m-20.625 0q2.555 0 4.547 1.547a7.4 7.4 0 0 1 2.695 4.007q.47 1.711.469 3.61 0 2.883-1.125 5.86a22.8 22.8 0 0 1-3.094 5.577 33 33 0 0 1-4.57 4.922A35 35 0 0 1 5.914 35l-3.398-3.398q5.296-4.243 7.218-6.563 1.946-2.32 2.016-4.617-2.86-.329-4.781-2.461-1.922-2.133-1.922-4.992 0-3.117 2.18-5.297 2.202-2.203 5.32-2.203" fill="#2563EB" />
                            </svg>

                            <p className="text-sm mt-3 text-gray-500">{test.text}</p>
                            <div className="flex items-center gap-3 mt-4">
                                <img className="h-12 w12 rounded-full" src={test.image} alt="userImage1" />
                                <div>
                                    <h2 className="text-lg text-gray-900 font-medium">{test.author}</h2>
                                    <p className="text-sm text-gray-500">{test.jobTitle}</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Testimonial
