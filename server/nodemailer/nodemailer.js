import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   host: "smtp.gmail.com",
//   port: 567,
//   auth: {
//     user: "coridebusiness@gmail.com",
//     pass: "rnju yacp jswt wnsw", // Or use your App Password
//   },
// });

// const mailOptions = {
//   from: {
//     name: "Coride",
//     address: "coridebusiness@gmail.com",
//   },
//   to: "himpreetak@gmail.com",
//   subject: "Hello",
//   text: "Hello World",
//   html: "<b>Hello World</b>",
// };

export const sendMail = async (transporter, mailOptions) => {
  try {
    await transporter.sendMail(mailOptions);
    console.log(`EMAIL SENT! to ${mailOptions.to}`);
  } catch (error) {
    console.log(error);
  }
};
// console.log(process.env.CORIDE_EMAIL);
// sendMail(transporter, mailOptions);
