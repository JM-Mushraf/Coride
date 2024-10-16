import axios from "axios";
import { toast } from "react-hot-toast";
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  VERIFY_OTP_REQUEST,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAIL
} from "../Reducers/UserReducer.js";

export const register = (userCredentials) => async (dispatch) => {
  try {
    dispatch(REGISTER_REQUEST());
    const config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    };
    const { data } = await axios.post('http://localhost:3000/user/register', userCredentials, config);
    dispatch(REGISTER_SUCCESS(data));
    toast.success("OTP sent to your email. Please verify.");
    return { success: true };
  } catch (error) {
    if (error.message && error.message === "Network Error") {
      toast.error("No Network!");
      dispatch(REGISTER_FAIL(error.message));
    } else {
      console.log(error);
      toast.error(error.response.data.error);
      dispatch(REGISTER_FAIL(error.response.data.message));
    }
    return { success: false };
  }
};

export const verifyOtp = (otpData) => async (dispatch) => {
  try {
    dispatch(VERIFY_OTP_REQUEST());
    const { data } = await axios.post('http://localhost:3000/user/verify-otp', otpData);
    dispatch(VERIFY_OTP_SUCCESS(data));
    toast.success("Registration Successful");
  } catch (error) {
    if (error.message && error.message === "Network Error") {
      toast.error("No Network!");
      dispatch(VERIFY_OTP_FAIL(error.message));
    } else {
      console.log(error);
      toast.error(error.response.data.error);
      dispatch(VERIFY_OTP_FAIL(error.response.data.message));
    }
  }
};
