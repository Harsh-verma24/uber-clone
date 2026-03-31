import React, { useContext, useEffect ,useState } from "react";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserProtectWrapper = ({ children }) => {
  const navigate = useNavigate();
  // const { user } = useContext(UserDataContext);
  const [isLoading, setIsLoading] = useState(true);
  const {user, setUser} = useContext(UserDataContext);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/user-login");
    }
    axios.get(`${import.meta.env.VITE_BASE_URL}/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if ((response.status = 200)) {
        setUser(response.data.user);
        setIsLoading(false);
      }
    })
    .catch((error) => {
      console.log(error);
      localStorage.removeItem("token");
      navigate("/user-login");
    });
  }, [token]);
  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default UserProtectWrapper;
