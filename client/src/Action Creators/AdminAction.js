import { ADMIN_LOGIN_REQUEST, ADMIN_LOGIN_SUCCESS, GET_PENDING_USERS_FAIL, GET_PENDING_USERS_REQUEST, GET_PENDING_USERS_SUCCESS } from "../Reducers/AdminReducer";
import axios from "axios";
import toast from "react-hot-toast";

export const adminLogin = (adminCredentials) => async (dispatch) => {
    try {
      dispatch({ type: ADMIN_LOGIN_REQUEST.type });
  
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      const { data } = await axios.post('http://localhost:3000/admin/login', adminCredentials, config);
      
      dispatch({ type: ADMIN_LOGIN_SUCCESS.type, payload: data });
      toast.success("Login Successful");
  
    } catch (error) {
      dispatch({ type: ADMIN_LOGIN_FAIL.type, payload: error.response.data.message });
      toast.error(error.response.data.message);
    }
  };
  export const getRequests = () => async (dispatch) => {
    try {
      dispatch({ type: GET_PENDING_USERS_REQUEST.type });
      const { data } = await axios.get('http://localhost:3000/admin/view-senders');
      dispatch({ type: GET_PENDING_USERS_SUCCESS.type, payload: data.senders });
      toast.success("Pending users fetched");
    } catch (error) {
      dispatch({ type: GET_PENDING_USERS_FAIL.type, payload: error.response.data.message });
      toast.error(error.response.data.message);
    }
  };