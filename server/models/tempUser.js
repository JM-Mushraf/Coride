import mongoose from "mongoose";

const tempUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    adminEmail: {
        type: String,
        required: true
    },
    avatar: {
        type: Object,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
       
    },
});

export const TempUser = mongoose.model("TempUser", tempUserSchema);
