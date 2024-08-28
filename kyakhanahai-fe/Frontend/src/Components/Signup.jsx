import React, { useRef, useEffect, useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import axios from "axios";
import "../App.css";
import { useNavigate } from "react-router-dom";
import FollowTheSignsIcon from "@mui/icons-material/FollowTheSigns";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import UserProfileContext from "../../Context/userContext.js";

const VITE_APP_API_URL = import.meta.env.VITE_APP_API_URL;

export default function Signup() {
  const { userDetails, setUserDetails } = useContext(UserProfileContext);
  const [error, setError] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      try {
        const previewUrl = URL.createObjectURL(selectedFile);
        const formData = new FormData();
        formData.append("profilePic", selectedFile);

        const response = await axios.post(
          `${VITE_APP_API_URL}/api/authenticate/upload`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          }
        );

        setUserDetails((prevDetails) => ({
          ...prevDetails,
          file: selectedFile,
          previewUrl: previewUrl,
          filePath: response.data.filePath,
        }));
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  useEffect(() => {
    const handleBeforeUnload = async () => {
      if (userDetails?.filePath) {
        try {
          await axios.delete(
            `${VITE_APP_API_URL}/api/authenticate/delete-file`,
            {
              data: { filePath: userDetails.filePath },
            }
          );
        } catch (error) {
          console.error("Error deleting file:", error);
        }
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      handleBeforeUnload();
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [userDetails?.filePath]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userDetails.password?.length < 10) {
      setError(true);
      return;
    }
    if (userDetails.phone?.length < 10) {
      setError(true);
      return;
    }
    const formData = new FormData();
    formData.append("email", userDetails?.email || "");
    formData.append("password", userDetails?.password || "");
    formData.append("name", userDetails?.name || "");
    formData.append("locality", userDetails?.locality || "");
    formData.append("address", userDetails?.address || "");
    formData.append("phone", userDetails?.phone || "");

    if (userDetails?.file) {
      formData.append("profilePic", userDetails.file);
    }

    try {
      const response = await axios.post(
        `http://localhost:3000/api/authenticate/signup`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const { email, name, address, phone, profilePic, locality } =
          response.data;
        setUserDetails({
          email,
          name,
          address,
          phone,
          profilePic,
          locality,
        });
        alert("You have successfully signed up");
        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert("User already registered");
        navigate("/signup");
      } else {
        console.error("Error signing up:", error);
      }
    }
  };

  return (
    <form encType="multipart/form-data" onSubmit={handleSubmit}>
      <div className="flex items-center justify-center gap-16 overflow-y-auto h-screen mt-8 mb-20">
        <div className="flex flex-col mb-4 items-center justify-center">
          <div className="relative w-60 h-60 flex cursor-pointer items-center justify-center rounded-full">
            <input
              type="file"
              name="profilePic"
              ref={fileInputRef}
              className="absolute inset-0 opacity-0 cursor-pointer"
              accept=".jpg, .png"
              onChange={handleFileChange}
            />
            <div
              className="w-full h-full flex items-center justify-center overflow-hidden"
              onClick={() => fileInputRef.current.click()}
            >
              {userDetails?.previewUrl ? (
                <img
                  src={userDetails.previewUrl}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <PhotoCameraIcon
                  className="text-gray-300"
                  sx={{
                    fontSize: 80,
                    color: "#e53935",
                  }}
                />
              )}
            </div>
          </div>
          <div className="mt-8">
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              className="w-full"
              sx={{
                backgroundColor: "#e53935",
                color: "#ffeb3b",
                fontWeight: "550",
                "&:hover": {
                  backgroundColor: "#ffeb3b", // Darker background color on hover
                  color: "#e53935", // Font color on hover (if needed)
                },
              }}
            >
              <FollowTheSignsIcon className="mr-2" />
              Signup
            </Button>
          </div>
        </div>
        <div>
          <div className="text-center flex-col flex justify-center items-center">
            <div className="m-4 w-80 z-10">
              <TextField
                id="outlined-name"
                label="Full Name"
                variant="outlined"
                value={userDetails?.name || ""}
                onChange={(e) =>
                  setUserDetails((prevDetails) => ({
                    ...prevDetails,
                    name: e.target.value,
                  }))
                }
                required
                fullWidth
              />
            </div>
            <div className="m-4 w-80">
              <TextField
                id="outlined-email"
                label="Email-Id"
                variant="outlined"
                value={userDetails?.email || ""}
                onChange={(e) =>
                  setUserDetails((prevDetails) => ({
                    ...prevDetails,
                    email: e.target.value,
                  }))
                }
                required
                fullWidth
              />
            </div>
            <div className="m-4 w-80">
              <TextField
                id="outlined-locality"
                label="Locality"
                variant="outlined"
                value={userDetails?.locality || ""}
                onChange={(e) =>
                  setUserDetails((prevDetails) => ({
                    ...prevDetails,
                    locality: e.target.value,
                  }))
                }
                required
                fullWidth
              />
            </div>
            <div className="m-4 w-80">
              <TextField
                id="outlined-address"
                label="Address"
                variant="outlined"
                value={userDetails?.address || ""}
                onChange={(e) =>
                  setUserDetails((prevDetails) => ({
                    ...prevDetails,
                    address: e.target.value,
                  }))
                }
                required
                fullWidth
              />
            </div>
            <div className="m-4 w-80">
              <Box component="form" noValidate autoComplete="off">
                <TextField
                  id="outlined-password"
                  label="Password"
                  variant="outlined"
                  type="password"
                  value={userDetails?.password || ""}
                  onChange={(e) =>
                    setUserDetails((prevDetails) => ({
                      ...prevDetails,
                      password: e.target.value,
                    }))
                  }
                  error={error}
                  helperText={
                    error ? "Password must be at least 10 characters long." : ""
                  }
                  inputProps={{
                    minLength: 10,
                  }}
                  required
                  fullWidth
                />
              </Box>
            </div>
            <div className="m-4 w-80">
              <Box component="form" noValidate autoComplete="off">
                <TextField
                  id="outlined-number"
                  label="Phone Number"
                  variant="outlined"
                  // type="number"
                  value={userDetails?.phone || ""}
                  onChange={(e) =>
                    setUserDetails((prevDetails) => ({
                      ...prevDetails,
                      phone: e.target.value,
                    }))
                  }
                  error={error}
                  helperText={
                    error ? "Phone Number must be 10 digit long." : ""
                  }
                  inputProps={{
                    minLength: 10,
                  }}
                  required
                  fullWidth
                />
              </Box>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
