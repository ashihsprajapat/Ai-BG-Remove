
import mongoose, { model, Schema } from "mongoose";

const userSchema = new Schema({
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    LastName: { type: String, required: true },
    creditBalanace: { type: Number, default: 5 },
    photo: { type: String, required:true }
})

const userModel = mongoose.model.user || model("User", userSchema)

export default userModel