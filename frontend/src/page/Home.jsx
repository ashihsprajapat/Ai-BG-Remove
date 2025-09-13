

import React from 'react'
import Hero from '../components/Hero'
import Steps from '../components/Steps'
import BgSlider from '../components/BgSlider'
import Testimonial from '../components/Testimonial'
import Upload from '../components/Upload'

function Home() {
    return (
        <div>
            <Hero />
            <Steps />
            <BgSlider />
            <Testimonial />
            <Upload/>
        </div>
    )
}

export default Home
