import { LOGIN_SUCCESS,LOGIN_REQUEST,LOGIN_FAIL,CLEAR_ERRORS, REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAIL, LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAIL } from "../Reducers/UserReducer.js"   
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export const login=(userCredentials)=>async(dispatch)=>{
    
    try {
        dispatch(LOGIN_REQUEST());
        
        const config = {
            headers: {
                "Content-Type": "application/json"  // Or adjust based on backend requirements
            }
        };
        const {data}=await axios.post('http://localhost:3000/user/login',userCredentials,config)
        // alert("working fine")
        dispatch(LOGIN_SUCCESS(data))
        toast.success("Login Successful")
        
    } catch (error) {
        console.log(error.response.data.error);
        toast.error(error.response.data.error)
        dispatch(LOGIN_FAIL(error.response.data.message));
    }
}

export const register = (userCredentials) => async (dispatch) => {
    try {
      dispatch(REGISTER_REQUEST());
      const config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      const { data } = await axios.post('/user/register', userCredentials, config);
      toast.success(data.message);
      dispatch({ type: REGISTER_SUCCESS });
      return {success:true,message:"Registration Done "}
    } catch (error) {
      if (error.message && error.message === "Network Error") {
        toast.error("No Network!");
        dispatch({ type: REGISTER_FAIL, payload: error.message });
      } else {
        console.log(error);
        toast.error(error.response.data.error);
        dispatch({ type: REGISTER_FAIL, payload: error.response.data.message });
      }
      return { success: false };
    }
  };
  
  export const verifyOtp = (otpData) => async (dispatch) => {
    try {
      dispatch({ type: VERIFY_OTP_REQUEST });
      const { data } = await axios.post('/user/verify-otp', otpData);
      dispatch({ type: VERIFY_OTP_SUCCESS, payload: data });
      toast.success("Registration Successful");
    } catch (error) {
      if (error.message && error.message === "Network Error") {
        toast.error("No Network!");
        dispatch({ type: VERIFY_OTP_FAIL, payload: error.message });
      } else {
        console.log(error);
        toast.error(error.response.data.error);
        dispatch({ type: VERIFY_OTP_FAIL, payload: error.response.data.message });
      }
    }
  };

export const logout=()=>async(dispatch)=>{
    
    try {
        dispatch(LOGOUT_REQUEST());
        
        
        const {data}=await axios.get('http://localhost:3000/user/logout');

        dispatch(LOGOUT_SUCCESS(data))
        toast.success("LOGGED oUT !")
        

    } catch (error) {
        console.log(error.response.data.error);
        toast.error(error.response.data.error)
        dispatch(LOGOUT_FAIL(error.response.data.message));
    }
}




export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };
  