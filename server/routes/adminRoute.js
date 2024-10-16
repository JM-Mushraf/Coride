import express from 'express'
import { isAuthenticated, isAuthenticatedAdmin } from '../middlewares/auth.js';
import { adminLogin, adminLogout, adminRegister, approveUser, rejectUser, viewSenders } from '../controllers/adminController.js';
export const adminRouter=express.Router();

adminRouter.post('/register',adminRegister);
adminRouter.post('/login',adminLogin);
adminRouter.get('/view-senders',isAuthenticatedAdmin,viewSenders);
adminRouter.get('/logout',adminLogout)
adminRouter.post('/reject/:id',isAuthenticatedAdmin,rejectUser);

adminRouter.post('/approve/:id',isAuthenticatedAdmin,approveUser)