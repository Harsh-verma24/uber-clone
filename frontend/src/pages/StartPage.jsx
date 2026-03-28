import React from "react";
import { Link } from "react-router-dom";
import { RiArrowRightLine } from "@remixicon/react";

const StartPage = () => {
  return (
    <div className="h-screen w-full">
      <div className="w-full pt-[1.2rem] pl-[1.2rem] absolute" id="logo">
        <img
          className="w-[25vw]"
          src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"
          alt=""
        />
      </div>
      <div id="splash">
        <img className="object-center" src="/splash.jpg" alt="" />
      </div>
      <div className="w-full py-[1.5rem] left-1/2 bg-white flex justify-center items-center
      ">
        <Link to={"/user-login"} className="inline-flex gap-8 text-white bg-green-800 w-[90%] py-4 justify-center items-center
        font-semibold text-2xl rounded text-center ">
          Get Started <RiArrowRightLine />
        </Link>
      </div>
    </div>
  );
};

export default StartPage;
