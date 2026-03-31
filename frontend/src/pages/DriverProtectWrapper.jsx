import React, { useContext, useEffect ,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DriverDataContext } from '../context/DriverContext';


const DriverProtectWrapper = ({ children }) => {
    const token = localStorage.getItem("token");
    const [isLoading,setIsLoading] = useState(true);
    const [driver,setDriver] = useContext(DriverDataContext);
const navigate = useNavigate();
    useEffect(() => {
        if (!token) {
            navigate("/driver-login");
        }   
    }, [token]);

    axios.get(`${import.meta.env.VITE_BASE_URL}/driver/profile`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    }).then(response=>{
      if(response.status= 200){
        setDriver(response.data.driver);
        setIsLoading(false);
      }
    }).catch(error=>{
      console.log(error);
      localStorage.removeItem("token");
      navigate("/driver-login");
    })

    if(isLoading){
        return <div>Loading...</div>
    }
  return (
    <>{children}</>
  )
}

export default DriverProtectWrapper