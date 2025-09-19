import express from 'express'
import { userCredits, webhooks } from '../controllers/user.controller.js';
import authUser from '../middelware/auth.js';
const userRoute = express.Router();

userRoute.post("/webhooks", webhooks);

userRoute.get("/credits", authUser, userCredits)

export default userRoute;
