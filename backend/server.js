import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import 'dotenv/config'
import connectToDB from "./config/Db.js";
import userRoute from "./routes/user.route.js";


const app = express();

const PORT = process.env.PORT || 8080;


app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));
app.use(cors("/*"));

app.listen(PORT, () => {
    console.log("App is listing on port", parseInt(PORT));
})


await connectToDB()




app.get("/", (req, res) => {
    res.send("ok its working")
})

app.use("/api/user", userRoute)


