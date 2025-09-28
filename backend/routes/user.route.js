import express from 'express'
import { paymnetRazorPay, userCredits, verifyRazorpay, webhooks } from '../controllers/user.controller.js';
import authUser from '../middelware/auth.js';
const userRoute = express.Router();

userRoute.post("/webhooks", webhooks);

userRoute.get("/credits", authUser, userCredits)

userRoute.post("/pay-razor", authUser, paymnetRazorPay)

userRoute.post("/verify-razor", verifyRazorpay)

export default userRoute;
