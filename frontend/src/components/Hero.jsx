
import React from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/appContext'

function Hero() {

    const {image, setImage, removeBg} = useAppContext()

    return (
        <div className="flex flex-col-reverse gap-10  md:flex-row px-4 md:px-16 lg:px-24 xl:px-32 mt-12 md:mt-20">
            <div className="max-md:text-center mt-8">
                <h5 className="text-3xl  md:text-6xl/[76px] font-semibold max-w-xl bg-gradient-to-r from-slate-900 to-[#6D8FE4] text-transparent bg-clip-text">
                    Remove the
                    background from
                    images for free.
                </h5>

                <p className="text-sm md:text-base max-w-lg mt-6 max-md:px-2 text-slate-600">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum has been the industry's standard dummy text ever.
                </p>

                <label htmlFor="file" className='px-8 mt-3 py-3 w-fit flex gap-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white active:scale-95 transition-all' >

                    <img src={assets.upload_btn_icon} alt="" className="w-4" />
                    upload your image
                </label>
                <input  accept='image/*' id='file' type="file" className='hidden'
                onChange={(e)=> removeBg(e.target.files[0])} />

            </div>
            <div className="w-full  md:max-w-xs lg:max-w-lg">
                <img className="w-fll  mx-auto "width={400} src={assets.header_img} alt="" />
            </div>
        </div>
    )
}

export default Hero
