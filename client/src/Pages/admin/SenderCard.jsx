import React, { useState } from 'react';
import axios from 'axios';
import './SenderCard.css';
import toast from 'react-hot-toast';
import { FaSpinner } from 'react-icons/fa'; // Spinner icon from react-icons

function SenderCard({ sender }) {
  const [approved, setApproved] = useState(false); // Track if approved
  const [rejected, setRejected] = useState(false); // Track if rejected
  const [loading, setLoading] = useState(false); // Loading state for API requests

  const handleApproval = (isApproved) => {
    setLoading(true); // Start loading
    const url = `http://localhost:3000/admin/${isApproved ? 'approve' : 'reject'}/${sender.senderId}`;
    
    axios.post(url)
      .then(response => {
        console.log(response.data);
        if (isApproved) {
          setApproved(true);
          setRejected(false); // Reset rejected state if approved
        } else {
          setRejected(true);
          setApproved(false); // Reset approved state if rejected
        }
        toast.success(`${sender.name} ${isApproved ? 'approved' : 'rejected'} successfully!`);
      })
      .catch(error => {
        console.error('Error updating sender:', error);
        toast.error('Error updating sender');
      })
      .finally(() => {
        setLoading(false); // Stop loading once the request completes
      });
  };

  return (
    <div className="card">
      <img src={sender.avatar.url} alt="" />
      <h2>{sender.name}</h2>
      <p>Email: {sender.email}</p>
      <p>Send Date: {new Date(sender.sendDate).toLocaleDateString()}</p>
      <p>Send Time: {sender.sendTime}</p>

      {approved && <div className="status approved">Approved</div>} {/* Show approved */}
      {rejected && <div className="status rejected">Rejected</div>} {/* Show rejected */}

      {!approved && !rejected && ( // Only show buttons if not approved or rejected
        <div className="buttons">
          <button 
            onClick={() => handleApproval(true)} 
            disabled={loading} // Disable button when loading
          >
            {loading ? <FaSpinner className="spinner" /> : 'Approve'}
          </button>
          <button 
            onClick={() => handleApproval(false)} 
            disabled={loading} // Disable button when loading
          >
            {loading ? <FaSpinner className="spinner" /> : 'Reject'}
          </button>
        </div>
      )}
    </div>
  );
}

export default SenderCard;
