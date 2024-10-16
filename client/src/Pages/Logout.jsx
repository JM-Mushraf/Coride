import React from 'react'
import { useSelector ,useDispatch} from 'react-redux';
import Loading from '../Loader/Loading';
import { logout } from '../Action Creators/UserAction';
import { useNavigate } from 'react-router-dom';
const Logout = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const handleLogout=()=>{
        dispatch(logout());
        navigate('/')
    }
    const { isAuthenticated } = useSelector((state) => state.user);
  return (
    <button onClick={()=>handleLogout()} >
        Logout
    </button>
  )
}

export default Logout