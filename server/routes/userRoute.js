import express from 'express'
import { getMyDetails, getUserDetails, login, logout, register } from '../controllers/userController.js';
import { isAuthenticated } from '../middlewares/auth.js';
import { generateText } from '../controllers/geminiController.js';
export const userRouter=express.Router();

userRouter.post('/register',register)
userRouter.post('/login',login)
userRouter.get('/logout',isAuthenticated,logout)
userRouter.get('/me',isAuthenticated,getMyDetails)
userRouter.get('/:id',getUserDetails)
// userRouter.post('/verify-otp',verifyOtpAndRegister)