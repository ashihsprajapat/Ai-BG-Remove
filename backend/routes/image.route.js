

import express from 'express'
import upload from '../middelware/multer.js'
import { removeBgImage } from '../controllers/image.controller.js'
import authUser from '../middelware/auth.js'
const imageRoute= express.Router()


imageRoute.post("/removeBgImage", upload.single("image"), authUser, removeBgImage)


export default imageRoute