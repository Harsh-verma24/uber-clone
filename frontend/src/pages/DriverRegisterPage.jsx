import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { DriverDataContext } from "../context/DriverContext";
const DriverRegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [driver, setDriver ] = React.useContext(DriverDataContext);
  
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const driverInfo = {
      email,
      password,
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      vehicle: {
        vehicleNumber: vehicleNumber,
        vehicleType: vehicleType,
        vehicleModel: vehicleModel,
        vehicleColor: vehicleColor,
        vehicleCapacity: vehicleCapacity,
      },
    };

    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setVehicleNumber("");
    setVehicleType("");
    setVehicleModel("");
    setVehicleColor("");
    setVehicleCapacity("");
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/driver/register`,
      driverInfo,
    );
    if (response.status == 201) {
      const data = response.data;
      localStorage.setItem("token", data.token);
      setDriver(data.driver);
      navigate("/driver-home");
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
      <h1>Driver Register</h1>
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
        <div className="text-[1.2rem] font-medium py-[0.5rem] px-[1rem]">
          <h1>Vehicle Information</h1>
        </div>
        <div className="flex gap-[1rem] px-[1rem]">
          <input
            type="text"
            placeholder="Vehicle Number"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
            className="border-1 border-[#4d4949] rounded w-[40%] h-[2rem] px-[0.5rem] placeholder:text-[#413e3e]"
          />
          <select
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            className="border-1 border-[#4d4949] rounded w-[40%] h-[2rem] px-[0.5rem]"
          >
            <option value="">Select Vehicle Type</option>
            <option value="car">Car</option>
            <option value="bike">Bike</option>
            <option value="auto">Auto</option>
          </select>
        </div>
        <div className="flex gap-[1rem] px-[1rem] pt-[1rem]">
          <input
            type="text"
            placeholder="Vehicle Model"
            value={vehicleModel}
            onChange={(e) => setVehicleModel(e.target.value)}
            className="border-1 border-[#4d4949] rounded w-[40%] h-[2rem] px-[0.5rem] placeholder:text-[#413e3e]"
          />
          <input
            type="text"
            placeholder="Vehicle Color"
            value={vehicleColor}
            onChange={(e) => setVehicleColor(e.target.value)}
            className="border-1 border-[#4d4949] rounded w-[40%] h-[2rem] px-[0.5rem] placeholder:text-[#413e3e]"
          />
        </div>
        <div className="flex flex-col gap-[1rem] w-full py-[1rem] px-[1rem]">
          <input
            type="number"
            placeholder="Vehicle Capacity"
            value={vehicleCapacity}
            onChange={(e) => setVehicleCapacity(e.target.value)}
            className="border-1 border-[#4d4949] rounded w-[80%] h-[2rem] px-[0.5rem] placeholder:text-[#413e3e]"
          />
        </div>
        <div className="text-[1rem] font-semibold mt-[1rem] flex justify-center">
          Already have an account?{" "}
          <Link className="text-blue-600" to={"/driver-login"}>
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
          to={"/user-login"}
        >
          join fleet as Rider ?
        </Link>
      </div>
    </section>
  </div>
);
}
export default DriverRegisterPage;
