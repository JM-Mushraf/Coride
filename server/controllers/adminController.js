import { Administrator } from "../models/adminModel.js";
import { sendToken } from "../middlewares/jwtToken.js";
import ErrorHandler from "../middlewares/ErrorHandler.js";
import { TempUser } from "../models/tempUser.js";
import { User } from "../models/userModel.js";
import { sendMail } from "../nodemailer/nodemailer.js";
import nodemailer from 'nodemailer'
export const adminRegister = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.json({
        success: false,
        message: "Please provide name and email",
      });
    }
    const admin = await Administrator.create({ name, email, password });
    res.status(201).json({
      success: true,
      admin,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      error,
    });
  }
};

export const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ErrorHandler("Enter everything", 200));
    }

    const admin = await Administrator.findOne({ email });
    if (!admin) {
      return next(new ErrorHandler("ADMIN NOT FOUND", 404));
    }
    if (admin.password != password) {
      return next(new ErrorHandler("Wrong passwword admin", 400));
    }
    sendToken(admin, 200, res, true);
  } catch (error) {
    console.log(error);
  }
};

export const addSender = (senderId, adminEmail) => async (req, res, next) => {
  try {
    console.log("Admin Email:", adminEmail); // Log the email being searched
    const admin = await Administrator.findOne({ email: adminEmail });
    if (!admin) {
      return next(new ErrorHandler("Admin not found"));
    }
    const newSender = {
      senderId,
    };
    admin.senders.push(newSender);

    // Save the administrator document
    await admin.save();
  } catch (error) {
    console.error("Error adding sender:", error);
  }
};

export const viewSenders = async (req, res, next) => {
  try {
    // Find the administrator by id
    const admin = await Administrator.findById(req.admin._id).populate(
      "senders.senderId",
      "name email avatar"
    );

    if (!admin) {
      return next(new ErrorHandler("Administrator not found", 404));
    }

    // // Extract sender details
    const senders = admin.senders
      .map((sender) => {
        if (!sender.senderId) {
          console.error(
            `SenderId is null for sender: ${JSON.stringify(sender)}`
          );
          return null;
        }

        return {
          senderId: sender.senderId._id,
          name: sender.senderId.name,
          email: sender.senderId.email,
          avatar: sender.senderId.avatar,
          sendDate: sender.sendDate,
          sendTime: sender.sendTime,
          approved: sender.approved,
        };
      })
      .filter((sender) => sender !== null); // Filter out any null values
    res.json({
      success: true,
      senders,
    });
  } catch (error) {
    console.log(error);
  }
};

export const approveUser = async (req, res, next) => {
  try {
    const user = await TempUser.findById(req.params.id);

    // if (!user) {
    //     return next(new ErrorHandler("User not found", 404));
    // }

    // // Update user status to approved
    const userData = {
      name: user.name,
      email: user.email,
      password: user.password,
      adminEmail: user.adminEmail,
      avatar: user.avatar,
    };
    const approvedUser = await User.create(userData);
    await TempUser.findOneAndDelete({ _id: req.params.id });
    const admin = await Administrator.findOne({ email: user.adminEmail });

    if (!admin) {
      return next(new ErrorHandler("Administrator not found", 404));
    }

    // Remove the sender from the admin's senders list
    admin.senders = admin.senders.filter(
      (sender) => sender.senderId.toString() !== user._id.toString()
    );

    // Save the updated administrator document
    await admin.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "coridebusiness@gmail.com",
        pass: "rnju yacp jswt wnsw",
      },
    });

    const mailOptions = {
      from: "coridebusiness@gmail.com",
      to: user.email,
      subject: "Registration Approved for coride",
      text: `Hi ${user.name}! Your email has been verified for Coride!`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      approvedUser,
      message: "User approved successfully!",
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, error.statusCode));
  }
};


export const rejectUser = async (req, res, next) => {
  try {
    const user = await TempUser.findById(req.params.id);
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    // Remove user from TempUser collection
    await TempUser.findOneAndDelete({ _id: req.params.id });

    // Find the admin who was associated with this user
    const admin = await Administrator.findOne({ email: user.adminEmail });
    if (!admin) {
      return next(new ErrorHandler("Administrator not found", 404));
    }

    // Remove the sender from the admin's senders list
    admin.senders = admin.senders.filter(
      (sender) => sender.senderId.toString() !== user._id.toString()
    );

    // Save the updated admin document
    await admin.save();

    res.status(200).json({
      success: true,
      message: "User rejected successfully!",
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, error.statusCode));
  }
};

export const adminLogout = async (req, res, next) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()), // Expire the cookie immediately
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully!",
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, error.statusCode));
  }
};
