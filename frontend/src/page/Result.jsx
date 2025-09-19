
import React from 'react'
import { assets } from './../assets/assets';
import { useAppContext } from '../context/appContext';
import { useNavigate } from 'react-router-dom';

function Result() {
    const { image, resultImage } = useAppContext()
    const Navigate = useNavigate()
    return (
        <div className='min-h-[75vh] mx-4 my-3 lg:mx-44 mt-14'>
            <div className='bg-white rounded-lg px-8 py-6 drop-shadow-sm'>
                {/* image contianser */}
                <div className='flex flex-col md:grid grid-cols-2 gap-8 '>
                    <div>
                        <p className='font-semibold text-gray-600 mb-2'>Original</p>
                        <img
                            className='rounded-md border'
                            src={image ? URL.createObjectURL(image) : assets.image_w_bg}
                            alt="Original image"
                        />
                    </div>
                    <div className='flex flex-col'>
                        <p className='font-semibold text-gray-600 mb-2'>Background Remove</p>
                        <div className='rounded-md border border-gray-300 h-full relative bg-layer overflow-hidden'>
                            <img className='rounded-md border' src={resultImage || ""} alt="" />

                            {!resultImage && image && <div className='absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2 '>
                                <div className='border-4 border-violet-600 rounded-full h-12 w-12 border-t-transparent animate-spin'>

                                </div>
                            </div>}

                        </div>
                    </div>
                </div>

                <div className='justify-center flex  sm:justify-end items-center flex-wrap gap-4 mt-6'>
                    <button className='border rounded-full px-9 text-sm  hover:scale-105 transition-all duration-700 text-violet-500 py-2'
                        onClick={() => { Navigate("/") }}>Try another image</button>
                    {
                        resultImage &&
                        <a href={resultImage} download className=' border px-9 py-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white text-sm 
                    hover:scale-105 transition-all duration-700'>Download  image</a>

                    }
                </div>
            </div>
        </div>
    )
}

export default Result
