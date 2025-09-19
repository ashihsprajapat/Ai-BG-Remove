
import axios from 'axios'
import fs from 'fs'
import FormData from 'form-data'
import userModel from '../model/user.js'


//controller function to remove bg from image
export const removeBgImage = async (req, res) => {
    try {
        const { clerkId } = req.user

        const userData = await userModel.findOne({ clerkId });
        if (!userData) {
            return res.json({ success: false, message: "User not found" })
        }
        if (userData.creditBalanace == 0) {
            return res.json({ success: false, message: "Your credits are not sufficient", creditBalanace: userData.creditBalanace })
        }

        const imagePath = req.file.path;
        //reading the image
        const imageFile = fs.createReadStream(imagePath)
        const formDate = new FormData()
        formDate.append('image_file', imageFile)

        //calling to  clipdrop api with api and formDate
        const { data } = await axios.post("https://clipdrop-api.co/remove-background/v1", formDate, {
            headers: {
                'x-api-key': process.env.CLIPDROP_API_KEY,

            },
            responseType: 'arraybuffer'
        })
        //response from clipdrop api is in arraybuffer format so we need to convert it to base64
        const bgImage = Buffer.from(data, 'binary').toString('base64')
        const resultImage = `data:${req.file.mimetype};base64,${bgImage}`


        //decrease creditBalance by 1
        await userModel.findOneAndUpdate({ clerkId }, { $inc: { creditBalanace: -1 } })

        res.json({ success: true, resultImage, creditBalanace: userData.creditBalanace - 1, message: "Background removed" })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}