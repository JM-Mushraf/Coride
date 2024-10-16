import { User } from "../models/userModel.js";
import { Administrator } from "../models/adminModel.js";
import jwt from 'jsonwebtoken';
import ErrorHandler from "./ErrorHandler.js";
import dotenv from 'dotenv'
dotenv.config()
export const isAuthenticated = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return next(new ErrorHandler("You need to Login to Access this Resource", 401));
        }

        const decodedData = jwt.verify(token, process.env.USER_SECRET_KEY);
        req.user = await User.findById(decodedData.id);
        next();
    } catch (error) {
        console.log(error);
        return next(new ErrorHandler(error.message, error.statusCode || 500));
    }
};

export const isAuthenticatedAdmin = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH");
        console.log("Admin Secret Key auth.js:", process.env.ADMIN_SECRET_KEY);
        if (!token) {
            return next(new ErrorHandler("You need to Login to Access this Resource", 401));
        }

        const decodedData = await jwt.verify(token, process.env.ADMIN_SECRET_KEY);
        const admin = await Administrator.findById(decodedData.id);

        if (!admin) {
            return next(new ErrorHandler("Admin not found", 404));
        }

        req.admin = admin;
        next();
    } catch (error) {
        console.log(error);
        return next(new ErrorHandler(error.message, error.statusCode || 500));
    }
};
