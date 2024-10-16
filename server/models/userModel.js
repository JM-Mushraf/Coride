import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    
  },
  avatar: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },

  }
  
  
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJWT = function () {
  return jwt.sign({ id: this._id }, "MYSECRETKEY", {
    expiresIn: "5d",
  });
};

userSchema.methods.comparePassword = async function (entered) {
  return await bcrypt.compare(entered, this.password);
};
export const User = new mongoose.model("User", userSchema);
