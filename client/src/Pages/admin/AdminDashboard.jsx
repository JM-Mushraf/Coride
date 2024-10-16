import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getRequests } from '../../Action Creators/AdminAction';
import SenderCard from './SenderCard';
import './AdminDashboard.css';
import Loading from '../../Loader/Loading';
import axios from 'axios';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, pendingUsers, isAuthenticated } = useSelector((state) => state.admin);
  const [senders, setSenders] = useState([]);

  useEffect(() => {
    // Fetch the sender data from the API
    dispatch(getRequests());
  }, [dispatch]);

  useEffect(() => {
    // Update senders state when pendingUsers changes
    if (pendingUsers) {
      setSenders(pendingUsers);
    }
    
  }, [pendingUsers]);

  if (loading) {
    return <Loading />;
  }

  const adminLogout=async()=>{
    try {
      const {data}=await axios.get('/admin/logout');
      toast.success(data.message);
      navigate('/admin/login')
    } catch (error) {
      toast.error('error in admin ')
    }
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-logout">
        <button onClick={adminLogout} >Logout</button>
      </div>
      <h1>Senders</h1>
      
      <div className="admin-cards-container">
      {senders.length === 0 ? (
          <p style={{color:"white"}} >No senders available</p>
        ) : (
          senders.map(sender => (
            <SenderCard key={sender.senderId} sender={sender} />
          ))
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
