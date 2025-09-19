

import React from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/appContext'

function Upload() {

    const {removeBg}= useAppContext()

    return (
        <div className='text-center'>
            <h1 className='text-3xl font-semibold mx-auto text-slate-600 text-center mt-20 mb-17'>See the magic. Try now</h1>
            <label htmlFor="file" className='px-8 mx-auto mt-3 py-3 w-fit flex gap-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white active:scale-95 transition-all' >

                <img src={assets.upload_btn_icon} alt="" className="w-4" />
                upload your image
            </label>
            <input   accept='image/*' id='file' type="file" className='hidden' 
            onChange={e=> removeBg(e.target.files[0])}/>
        </div>
    )
}

export default Upload
