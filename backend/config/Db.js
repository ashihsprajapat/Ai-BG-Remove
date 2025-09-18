
import mongoose from "mongoose";

import 'dotenv/config'


const connectToDB = async () => {
    mongoose.connection.on('connected', () => {
        console.log("Connect to database Ai bg remove")
    })
    await mongoose.connect(`${process.env.DB_URL}/AI_Bg_Remove`);
}


export default connectToDB