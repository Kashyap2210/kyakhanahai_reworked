import React, { useState, useEffect } from "react";
import UserProfileContext from "./userContext";

export const UserProfileContextProvider = ({ children }) => {
  // Initialize state from localStorage, or with default values if localStorage is empty
  const [jwtToken, setJwtToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userDetails, setUserDetails] = useState(() =>
    setUserDetailsInLocalStorage()
  );

  function setUserDetailsInLocalStorage() {
    {
      const savedUserDetails = localStorage.getItem("userDetails");
      return savedUserDetails
        ? JSON.parse(savedUserDetails)
        : {
            id: "",
            profilePic: null,
            name: "",
            password: "",
            address: "",
            phoneNumber: "",
            locality: "",
            email: "",
            previewUrl: null,
            file: null,
            filePath: null,
          };
    }
  }
  console.log("Context Provider Rendered with userDetails:", userDetails);
  console.log(
    "Context Provider Rendered with isAuthenticated:",
    isAuthenticated
  );

  // Load token from localStorage when the app starts
  useEffect(() => {
    const storedToken = localStorage.getItem("jwtToken");
    const savedUserDetails = localStorage.getItem("userDetails");

    if (storedToken && savedUserDetails) {
      setJwtToken(storedToken);
      setUserDetails(JSON.parse(savedUserDetails));
      setIsAuthenticated(true);
    } else {
      setJwtToken(null);
      setUserDetails(null);
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <UserProfileContext.Provider
      value={{
        jwtToken,
        setJwtToken,
        userDetails,
        setUserDetails,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};

export default UserProfileContextProvider;
