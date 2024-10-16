import ErrorHandler from "../middlewares/ErrorHandler.js"
import { User } from "../models/userModel.js";
import { sendToken } from "../middlewares/jwtToken.js";
import bcrypt from 'bcryptjs'
import cloudinary from 'cloudinary'
import nodemailer from 'nodemailer'
import { sendMail } from "../nodemailer/nodemailer.js";
import crypto from 'crypto'
import { TempUser } from "../models/tempUser.js";
import { addSender } from "./adminController.js";

import { Administrator } from "../models/adminModel.js";

export const register = async (req, res, next) => {
    try {
        const { name, email, password ,adminEmail} = req.body;

    if (!name || !email || !password || !adminEmail) {
      return next(new ErrorHandler("Enter All the Details!", 400));
    }

    const isEmailExist = await User.findOne({ email });
    if (isEmailExist) {
      return next(new ErrorHandler("Email Already Exists", 400));
    }

    if (!req.files || !req.files.avatar) {
      return next(new ErrorHandler("Avatar is required", 400));
    }

    // const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // const transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: "coridebusiness@gmail.com",
    //     pass: "rnju yacp jswt wnsw",
    //   },
    // });

    // const mailOptions = {
    //   from: "coridebusiness@gmail.com",
    //   to: email,
    //   subject: "OTP Verification",
    //   text: `Your OTP is ${otp}`,
    // };

    // await transporter.sendMail(mailOptions);

    const file = req.files.avatar;
    const myCloud = await cloudinary.v2.uploader.upload(file.tempFilePath, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    const tempUser ={
      name,
      email,
      password,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
      adminEmail,
    };



    const temp=await TempUser.create(tempUser);
    const tempId=temp._id;
    const admin = await Administrator.findOne({ email: adminEmail });
    if (!admin) {
      return next(new ErrorHandler("Admin not found"));
    }
    
    admin.senders.push({senderId:temp._id});

    // Save the administrator document
    await admin.save();


    res.status(200).json({
      success: true,
      tempUser,
      message: "Verification request sent to your college email please verify there",
      
    });

        // const file = req.files.avatar;
        // const myCloud = await cloudinary.v2.uploader.upload(file.tempFilePath, {
        //     folder: "avatars",
        //     width: 150,
        //     crop: "scale",
        // });

        // const user = await User.create({
        //     name,
        //     email,
        //     password,
        //     avatar: {
        //         public_id: myCloud.public_id,
        //         url: myCloud.secure_url
        //     }
        // });

        // sendToken(user, 201, res);
    } catch (error) {
        console.log(error);
        return next(new ErrorHandler(error.message, error.statusCode));
    }
};


// export const verifyOtpAndRegister = async (req, res, next) => {
//     try {
//       const { email, otp } = req.body;
  
//       const tempUser = await TempUser.findOne({ email, otp });
//       if (!tempUser) {
//         return next(new ErrorHandler("Invalid OTP", 400));
//       }
  
//       const user = await User.create({
//         name: tempUser.name,
//         email: tempUser.email,
//         password: tempUser.password,
//         avatar: tempUser.avatar,
//       });
  
//       await TempUser.deleteOne({ email });
  
//       sendToken(user, 201, res);
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   };

export const login=async(req,res,next)=>{
    try {
        const {email,password}=req.body;

        if(!email || !password){
            return next(new ErrorHandler("Enter All The Details!",400));

        }
        const user=await User.findOne({email});
        
        if(!user){
            return next(new ErrorHandler("Invalid Email or password"));
        }
       
        const isPasswordsMatch =await bcrypt.compare(password,user.password);

        if(!isPasswordsMatch){
            return next(new ErrorHandler("Invalid emaail or password",401))
        }
        

        sendToken(user,200,res);

    } catch (error) {
        console.log(error);
        return next(new ErrorHandler(error.message,error.statusCode));
        
    }
}

export const logout=async(req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    })


    res.status(200).json({
        success:true,
        message:"Logged Out"
    })
}


export const getMyDetails=async(req,res,next)=>{
    try {
        
        const user=await User.findById(req.user.id);
        res.status(200).json({
            success:true,
            user,
        })

    } catch (error) {
        return next(new ErrorHandler(error.message,error.statusCode))
    }
}


export const getUserDetails=async(req,res,next)=>{
    try {
        const user=await User.findById(req.params.id)
        res.status(200).json({
            success:true,
            user,
        })
    } catch (error) {
        
    }
}


