import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import UserProfileContext from "../../Context/userContext";
import { useNavigate } from "react-router-dom";
import PinDropIcon from "@mui/icons-material/PinDrop";
import PhoneIcon from "@mui/icons-material/Phone";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom"; //Link is used to give useNavigate a link to certain element

const VITE_APP_API_URL = import.meta.env.VITE_APP_API_URL;

export default function Profile() {
  const { userDetails, isAuthenticated, jwtToken } =
    useContext(UserProfileContext);
  console.log(userDetails);
  const navigate = useNavigate();
  // const [loading, setLoading] = useState(true);

  /*

  WE GET THE USER DETAILS FROM THE JWT TOKEN

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userResponse = await axios.get(
          `${VITE_APP_API_URL}/api/authenticate/user`,
          {
            withCredentials: true,
          }
        );
        console.log(userResponse.data);
        // Update context with user details
        setUserDetails(userResponse.data);
        // setLoading(false);
      } catch (error) {
        console.error("Error fetching user details:", error);
        // setLoading(false);
        navigate("/"); // Redirect to home if there's an error
      }
    };

    // Fetch user details if not already present

    fetchUserDetails();
    const intervalId = setInterval(fetchUserDetails, 1000); //Sets periodic timer that calls checkAuth every second.
    return () => clearInterval(intervalId);
  }, []);

  // if (loading) {
  //   return <p>Loading...</p>;
  // }


  if (!userDetails || !userDetails.username) {
    return <p className="text-white">Please log in again.</p>; // Redirect or show message
  }

  */
  const profilePicUrl = userDetails.profilePic;

  const deleteUser = async () => {
    if (isAuthenticated == true) {
      try {
        const deleteAccount = await axios.delete(
          `${VITE_APP_API_URL}/api/authenticate/deleteaccount`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          },
          {
            data: { userId: userDetails._id }, // Sending additional data
            withCredentials: true,
          }
        );
        if (deleteAccount.status === 200) {
          console.log("Account Deleted");
        }
      } catch (error) {
        console.error("Error deleting account:", error);
      }
    } else {
      alert("Please Login");
      navigate("/login");
    }
  };

  return (
    // This is the grand container div
    <div className="container  py-16 px-20 flex  items-center align-center justify-center	">
      {" "}
      {/* LHS Section Starts Here */}
      <div className="lhs-side  flex gap-4 flex-col items-center align-center  w-1/2">
        <div className="w-60 h-60  rounded-full">
          {userDetails.profilePic ? (
            <img src={profilePicUrl} alt="Profile" className="rounded-full" />
          ) : (
            "No image available"
          )}
        </div>
        <div className="text-4xl font-semibold	">
          {userDetails.name || "Not available"}
        </div>
        <div className="text-xl font-normal	">
          {userDetails.email || "Not available"}
        </div>
      </div>
      {/* LHS Section Ends Here */}
      {/* RHS Section Starts Here */}
      <div className="rhs-side h-100 flex gap-12 flex-col items-center align-center w-1/2">
        <div className="text-4xl">
          <PinDropIcon sx={{ fontSize: 36, lineHeight: 40 }} />
          {userDetails.address || "Not available"}
        </div>
        <div className="text-4xl">
          <PinDropIcon sx={{ fontSize: 36, lineHeight: 40 }} />
          Locality: {userDetails.locality || "Not available"}
        </div>
        <div className="text-xl font-normal	">
          <PhoneIcon sx={{ marginRight: 1 }} />
          {userDetails.phone || "Not available"}
        </div>
        <div>
          <Link to="/showdish">
            <Button
              color="secondary"
              variant="contained"
              sx={{
                marginTop: "2rem",
                backgroundColor: "#e53935",
                color: "#ffeb3b",
                fontWeight: "550",
                "&:hover": {
                  backgroundColor: "#ffeb3b", // Darker background color on hover
                  color: "#e53935", // Font color on hover (if needed)
                },
              }}
            >
              See Your Dishes
            </Button>
          </Link>
        </div>
        <div>
          <Link to="/">
            <Button
              color="secondary"
              variant="contained"
              onClick={deleteUser}
              sx={{
                // marginTop: "2rem",
                backgroundColor: "#e53935",
                color: "#ffeb3b",
                fontWeight: "550",
                "&:hover": {
                  backgroundColor: "#ffeb3b", // Darker background color on hover
                  color: "#e53935", // Font color on hover (if needed)
                },
              }}
            >
              Delete Account
            </Button>
          </Link>
        </div>
      </div>
      {/* RHS Section Ends Here */}
    </div>
  );
}
