
import React from 'react'
import { assets } from './../assets/assets';

const Steps = () => {
    const data = [
        {
            img: assets.upload_icon,
            heading: "Upload image",
            p: "This is a demo text, will replace it later.This is a demo.."
        },
        {
            img: assets.remove_bg_icon,
            heading: "Remove background",
            p: "This is a demo text, will replace it later.This is a demo.."
        },
        {
            img: assets.download_icon,
            heading: "Download image",
            p: "This is a demo text, will replace it later. This is a demo.."
        },
    ]
    return (
        <div className='mt-20'>
            <h1 className="text-3xl font-semibold mx-auto text-slate-600 text-center">Steps to remove background <br />
                image in seconds</h1>
            <div className="flex flex-wrap items-center justify-center gap-6 mt-12">
                {
                    data.map((card, i) => (
                        <div className="p-7 pb-10  flex gap-3  bg-white border  drop-shadow-blue-100 rounded   hover:scale-105 transition-all duration-500 py-3 " key={i}>
                            <img src={card.img} alt={card.img} className='max-w-9' />
                            <div className='  '>
                                <p className="mt-4 text-lg ">{card.heading}</p>
                                <p className="text-sm font-medium bg-gradient-to-r  from-[#8B5CF6] via-[#9938CA] to-[#E0724A] text-transparent bg-clip-text">{`${card.p}`}</p>
                            </div>
                        </div>
                    ))
                }



            </div>
        </div>
    )
}

export default Steps
