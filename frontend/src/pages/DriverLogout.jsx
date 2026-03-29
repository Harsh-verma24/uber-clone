import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const DriverLogout = () => {
    const navigate = useNavigate();

    axios.get(`${import.meta.env.VITE_BASE_URL}/driver/logout`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    }).then((response) => {
        if(response.status == 200) {
            localStorage.removeItem("token");
            navigate("/driver-login");
        }
    });


  return (
    <div>DriverLogout</div>
  )
}

export default DriverLogout