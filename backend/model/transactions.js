
import mongoose, { model, Schema } from "mongoose";

const transactionSchema = new Schema({
    clerkId: { type: String, required: true },
    plan: { type: String, required: true },
    credits: { type: Number, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now() },
    payment: { type: Boolean, default: false }
})

const transactionModel = model("transaction", transactionSchema)

export default transactionModel;