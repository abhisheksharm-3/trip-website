import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please Provide a Name"],
            minlength: [3, "Name must be atleast 4 characters long"]
        },
        email: {
            type: String,
            required: [true, "Please provide an Email"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Please provide a password"],

        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        forgotPasswordToken: String,
        forgotPasswordTokenExpiry: Date,
        verifyToken: String,
        verifyTokenExpiry: Date,
        lastLogin: Date,

    }
)

const User = mongoose.models.users || mongoose.model(
    "users", userSchema  // name of the collection in mongoDB
);

export default User;