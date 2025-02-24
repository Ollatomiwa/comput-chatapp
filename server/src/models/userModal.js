import mongoose from "mongoose";

//SCHEMA FOR USER
const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },

        fullName: {
            type: String,
            required: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        profilePic: {
            type: String,
            default: "",
        },
    },
    { timestamps: true}
);

//modal
const User = mongoose.model("User", userSchema);

export default User;