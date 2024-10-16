import express from 'express'
import { error } from './middlewares/error.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import chatRoute from './routes/chatRoute.js'
import MessageRoute from './routes/messageRoute.js'
const app=express();

import { userRouter } from './routes/userRoute.js';
import { tripRouter } from './routes/tripRoute.js';
import { sendMail } from './nodemailer/nodemailer.js';


import { adminRouter } from './routes/adminRoute.js';
import { generateText } from './controllers/geminiController.js';
app.use(
    cors({
        credentials:true,
        origin:'http://localhost:5173'
    })
)
// app.get('/sendmail',sendMail)
app.use(cookieParser())
app.use(express.json())
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
    limits: { fileSize: 50 * 1024 * 1024 }
}));

app.use('/user',userRouter);
app.use('/trips',tripRouter);
app.use('/admin',adminRouter);
app.post('/gemini/generate-text',generateText)
app.use('/chat',chatRoute)
app.use('/message',MessageRoute)




app.use(error);

export default app;