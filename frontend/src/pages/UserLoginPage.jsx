import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const UserLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        <h1>User Login</h1>
      </div>
      <section>
        <form >
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
            New to Uber ? <Link
            className='text-blue-600'
             to={"/user-signup"}>Create account</Link>
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
          to={"/driver-login"}>join fleet as Driver ?</Link>
          </div>
      </section>

    </div>
  )
}

export default UserLoginPage