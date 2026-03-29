import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const DriverProtectWrapper = ({ children }) => {
    const token = localStorage.getItem("token");
const navigate = useNavigate();
    useEffect(() => {
        if (!token) {
            navigate("/driver-login");
        }   
    }, [token]);
  return (
    <>{children}</>
  )
}

export default DriverProtectWrapper