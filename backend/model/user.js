
import mongoose, { model, Schema } from "mongoose";

const userSchema = new Schema({
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    firstName: { type: String, },
    LastName: { type: String, },
    creditBalanace: { type: Number, default: 5 },
    photo: { type: String, required:true }
})

const userModel = mongoose.model.user || model("User", userSchema)

export default userModel