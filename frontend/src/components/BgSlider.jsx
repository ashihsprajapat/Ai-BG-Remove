
import React, { useState } from 'react'
import { assets } from '../assets/assets';

function BgSlider() {

    const [sliderPosition, setSlider] = useState(50);
    const handlerSliderChange = (e) => {
        setSlider(e.target.value)
    }
    return (
        <div className='pb-10 md:py-20 mx-2'>
            <h1 className='mb-12  sm:mb-20 text-center text-2xl md:text-3xl mt-4 font-semibold lg:text-4xl'>Remove Background With High <br />
                Quality and Accuracy</h1>

            <div className='relative w-fit max-w-3xl overflow-hidden m-auto rounded-xl'>

                <img src={assets.image_w_bg} style={{ clipPath: `inset(0 ${100.2 - sliderPosition}% 0 0)` }} alt="" />
                <img src={assets.image_wo_bg} alt="" style={{ clipPath: `inset(0  0 0 ${sliderPosition}%)` }}
                    className='absolute  top-0 left-0' />
                <input type="range" onChange={handlerSliderChange} min={0} max={100} className='  h-full absolute top-1/2 left-1/2 transform -translate-x-1/2
                -translate-y-1/2
                cursor-pointer
                 w-full z-10 slider' />
            </div>
        </div>
    )
}

export default BgSlider
