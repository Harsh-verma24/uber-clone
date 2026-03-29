import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {UserDataContext} from "../context/UserContext";

const UserRegisterPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const {user,setUser}= React.useContext(UserDataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userInfo = {
      email,
      password,
      fullname:{
        firstname: firstName,
        lastname: lastName
      }
    };
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/user/register`,
      userInfo
    );
    // setUserData(userInfo);
    // console.log(userInfo);
    if (response.status === 201) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem("token",data.token);
      navigate("/home");
    }
  };

  return (
    <div className="w-full h-screen">
      <div className="w-full pt-[1.2rem] pl-[1.2rem]" id="logo">
        <img
          className="w-[25vw]"
          src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"
          alt=""
        />
      </div>
      <div className="w-full flex justify-center items-center text-[2rem] font-bold">
        <h1>User Register</h1>
      </div>
      <section>
        <form onSubmit={handleSubmit}>
          <div>
            <div className="text-[1.2rem] font-medium py-[0.5rem] px-[1rem]">
              <h1> Enter your Full Name</h1>
            </div>
            <div className="flex gap-[1rem] px-[1rem]">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className=" border-1 border-[#4d4949] rounded w-[40%] h-[2rem]
            px-[0.5rem] placeholder:text-[#413e3e]"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className=" border-1 border-[#4d4949] rounded w-[40%] h-[2rem]
            px-[0.5rem] placeholder:text-[#413e3e]"
              />
            </div>
          </div>
          <div className="flex flex-col gap-[1rem] w-full py-[1rem] px-[1rem]">
            <h3 className="text-[1.2rem] font-semibold">What's your Email?</h3>
            <input
              type="email"
              value={email}
              placeholder="Sample@email.com"
              className=" border-1 border-[#4d4949] rounded w-[80%] h-[2rem]
            px-[0.5rem] placeholder:text-[#413e3e]"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-[1rem] w-full py-[1rem] px-[1rem]">
            <h3 className="text-[1.2rem] font-semibold">Enter your Password</h3>
            <input
              type="password"
              value={password}
              placeholder="Password"
              className=" border-1 border-[#4d4949] rounded w-[80%] h-[2rem]
            px-[0.5rem] placeholder:text-[#413e3e]"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="text-[1rem] font-semibold mt-[1rem] flex justify-center">
            Already have an account?{" "}
            <Link className="text-blue-600" to={"/user-login"}>
              Login
            </Link>
          </div>
          <div className=" flex w-[80%] text-white mx-auto mt-[2rem]">
            <button
              type="submit"
              className=" bg-green-800 text-[1.2rem] py-[1rem] rounded  font-bold w-full "
            >
              Create Account
            </button>
          </div>
        </form>
        <div className="flex justify-center pt-5">
          <Link
            className="text-blue-800 font-medium leading-2"
            to={"/driver-login"}
          >
            join fleet as Driver ?
          </Link>
        </div>
      </section>
    </div>
  );
};

export default UserRegisterPage;
