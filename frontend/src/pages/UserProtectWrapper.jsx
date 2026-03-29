import React,{useContext, useEffect} from 'react'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom';

const UserProtectWrapper = ({children}) => {
  const navigate = useNavigate();
  // const {user} = useContext(UserDataContext);
  const token = localStorage.getItem("token");
 useEffect(() => {
    if(!token){
      navigate("/user-login");
    }
  }, [token]);


  return (
    <>
      {children}
    </>
  )
}

export default UserProtectWrapper