import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { DriverDataContext } from '../context/DriverContext';
import { Link, useNavigate } from 'react-router-dom';
const DriverLoginPage = () => {
 const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const [driver, setDriver ] = React.useContext(DriverDataContext);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const driverInfo = {
      email,
      password,
    };
    setEmail("");
    setPassword("");

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/driver/login`,
      driverInfo,
    );
    if(response.status == 200) {
      const data = response.data;
      localStorage.setItem("token", data.token);
      setDriver(data.driver);
      navigate("/driver-home");
    }
  }
  return (
    <div className='w-full h-screen'>
       <div className="w-full pt-[1.2rem] pl-[1.2rem]" id="logo">
        <img
          className="w-[25vw]"
          src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"
          alt=""
        />
      </div>
      <div className="w-full flex justify-center items-center text-[2rem] font-bold">
        <h1>Driver Login</h1>
      </div>
      <section>
        <form onSubmit={handleSubmit} >
          <div className='flex flex-col gap-[1rem] w-full py-[1rem] px-[1rem]'>
            <h3
             className='text-[1.2rem] font-semibold'>
              What's your Email?</h3>
            <input type="email"
            value={email}
            placeholder='Sample@email.com'
            className=' border-1 border-[#4d4949] rounded w-[80%] h-[2rem]
            px-[0.5rem] placeholder:text-[#413e3e]'
            onChange={(e) => setEmail(e.target.value)}
            />
          </div>
            <div className='flex flex-col gap-[1rem] w-full py-[1rem] px-[1rem]'>
            <h3
             className='text-[1.2rem] font-semibold'>
              Enter your Password</h3>
            <input type="password"
            value={password}
            placeholder='Password'
            className=' border-1 border-[#4d4949] rounded w-[80%] h-[2rem]
            px-[0.5rem] placeholder:text-[#413e3e]'
            onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div
           className='text-[1rem] font-semibold mt-[1rem] flex justify-center'>
            New Driver ? <Link
            className='text-blue-600'
             to={"/driver-signup"}>Create account</Link>
          </div>
          <div
          className=' flex w-[80%] text-white mx-auto mt-[2rem]'>
            <button
            type='submit'
           className=' bg-green-800 text-[1.2rem] py-[1rem] rounded  font-bold w-full '>
            Login
          </button>
          </div>
        </form>
        <div className='flex justify-center pt-5'>
          <Link 
          className='text-blue-800 font-medium leading-2'
          to={"/user-login"}>join fleet as Rider ?</Link>
          </div>
      </section>

    </div>
  )
}

export default DriverLoginPage