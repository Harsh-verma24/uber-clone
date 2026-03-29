import React, { useState } from "react";

export const DriverDataContext = React.createContext();
const DriverContext = ({ children }) => {
  const [driver, setDriver] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);
  const updateDriver = (driverData) => {
    setDriver(driverData);
  };
  const value = [
    driver,
    setDriver,
    isLoading,
    setIsLoading,
    error,
    setError,
    updateDriver,
  ];
  return (
    <DriverDataContext.Provider value={value}>
      {children}
    </DriverDataContext.Provider>
  );
};

export default DriverContext;
