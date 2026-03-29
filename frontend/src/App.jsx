import React from "react";
import { Routes, Route } from "react-router-dom";
import StartPage from "./pages/StartPage";
import UserLoginPage from "./pages/UserLoginPage";
import UserRegisterPage from "./pages/UserRegisterPage";
import DriverLoginPage from "./pages/DriverLoginPage";
import DriverRegisterPage from "./pages/DriverRegisterPage";
import Home from "./pages/Home";
import UserProtectWrapper from "./pages/UserProtectWrapper";
import UserLogout from "./pages/UserLogout";
import DriverHome from "./pages/DriverHome";
import DriverProtectWrapper from "./pages/DriverProtectWrapper";
import DriverLogout from "./pages/DriverLogout";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/user-login" element={<UserLoginPage />} />
        <Route path="/user-signup" element={<UserRegisterPage />} />
        <Route path="/driver-login" element={<DriverLoginPage />} />
        <Route path="/driver-signup" element={<DriverRegisterPage />} />
        <Route
          path="/home"
          element={
            <UserProtectWrapper>
              <Home />
            </UserProtectWrapper>
          }
        />
        <Route
          path="/user/logout"
          element={
            <UserProtectWrapper>
              <UserLogout />
            </UserProtectWrapper>
          }
        />
        <Route
          path="/driver-home"
          element={
            <DriverProtectWrapper>
              <DriverHome />
            </DriverProtectWrapper>
          }
        />
        <Route
          path="/driver/logout"
          element={
            <DriverProtectWrapper>
              <DriverLogout />
            </DriverProtectWrapper>
          }
        />
      </Routes>
    </>
  );
};

export default App;
