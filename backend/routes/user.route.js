import express from 'express'
import { webhooks } from '../controllers/user.controller.js';
const userRoute = express.Router();

userRoute.post("/webhooks", webhooks);

export default userRoute;
