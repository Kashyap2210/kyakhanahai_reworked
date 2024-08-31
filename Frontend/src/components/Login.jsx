import React, { useState, useContext, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import "../App.css";
import UserProfileContext from "../context/userContext";

const VITE_APP_API_URL = import.meta.env.VITE_APP_API_URL;

export default function Login() {
  const { setIsAuthenticated } = useContext(UserProfileContext);
  const [username, setUsername] = useState(""); // Username is stored as state variable
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { userDetails, setUserDetails, setJwtToken } =
    useContext(UserProfileContext); // Get context setter function

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (password?.length < 10) {
      setError(true);
      return;
    }
    const credentials = { username, password }; // Construct the credentials object

    try {
      const response = await axios.post(
        `${VITE_APP_API_URL}/api/authenticate/login`,
        credentials,
        {
          withCredentials: true,
        }
      );
      const { token, logInUser: user } = response.data.userData;

      setJwtToken(token);
      setUserDetails(user);
      setIsAuthenticated(true);

      localStorage.setItem("jwtToken", token);
      localStorage.setItem("userDetails", JSON.stringify(user));

      navigate("/");
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="login-form text-center h-screen flex justify-center pt-20 w-full">
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="m-8 w-80">
          <TextField
            id="outlined-username"
            label="Email-Id"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            fullWidth
          />
        </div>
        <div className="m-8">
          <Box noValidate autoComplete="off">
            <TextField
              id="outlined-password-login"
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
        <div className="w-full px-8">
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
            <LoginIcon />
            &nbsp;&nbsp;&nbsp;Login
          </Button>
        </div>
      </form>
    </div>
  );
}
