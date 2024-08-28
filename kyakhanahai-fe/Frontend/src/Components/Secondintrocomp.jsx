// This is the 2nd component on the home page
import { Link } from "react-router-dom";
import "../App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom"; //useNavigate is used to change to components on the DOM to some preset components
import Button from "@mui/material/Button";
import { useContext } from "react";
import UserProfileContext from "../../Context/userContext";

const VITE_APP_API_URL = import.meta.env.VITE_APP_API_URL;

export default function Secondintrocomp() {
  const { userDetails, jwtToken, isAuthenticated } =
    useContext(UserProfileContext);
  const navigate = useNavigate();

  const showDish = async (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      try {
        const response = await axios.get(
          `${VITE_APP_API_URL}/api/dish/showdish`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
            withCredentials: true, // Include credentials in the request
          }
        );
        console.log("Request sent");
        console.log(response.data);

        if (response.status === 200) {
          navigate("/showdish", { state: { dishes: response.data } });
          console.log("Navigated");
        } else {
          navigate("/login");
          console.log("Login failed");
        }
      } catch (error) {
        console.error("Error fetching dishes:", error);
        alert("An error occurred while fetching dishes. Please try again.");
      }
    } else {
      alert("Please Login");
      navigate("/login");
    }
  };

  const addDish = async (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      navigate("/adddish");
    } else {
      alert("Please Login");
      navigate("/login");
    }
  };

  const getDish = async (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      try {
        navigate("/getdish");

        const response = await axios.get(
          `${VITE_APP_API_URL}/api/dish/getdish`,
          {
            params: { userId: userDetails._id },
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
            withCredentials: true, // Include credentials in the request
          }
        );
        console.log("Request sent");
        console.log(response);

        if (response.status === 200) {
          //once the random dish is generated then we navigate to Getdish component
          navigate("/getdish", { state: { dish: response.data } });
          console.log(response.data);
          console.log("Navigated");
        } else {
          console.log("Login failed");
        }
      } catch (error) {
        console.error("Error logging in:", error);
      }
    } else {
      alert("Please Login");
      navigate("/login");
    }
  };

  return (
    <div>
      <div className="main-content flex items-center justify-between bg-bg-champagne p-8 text-2xl text-justify	">
        <img
          // style={{ borderRadius: "12px" }} // Set border radius with inline styles
          src="second_intro.jpg"
          alt=""
          className="w-1/2 main-content rounded-2xl"
        />
        <p className="w-1/2 pl-4">
          <i className="text-4xl font-bold">How do we do it?</i>
          <br />
          We take info from you about what you eat regularly & select a random
          dish for you from yout persomalised data.
          <br />
          <br />
          <Button
            variant="contained"
            className="h-8 border"
            sx={{
              backgroundColor: "#e53935",
              color: "#ffeb3b",
              fontWeight: "550",
              "&:hover": {
                backgroundColor: "#ffeb3b", // Darker background color on hover
                color: "#e53935", // Font color on hover (if needed)
              },
            }}
            onClick={addDish}
          >
            Add Dish
          </Button>
          &nbsp;&nbsp;&nbsp;
          <Link to="/showdish">
            <Button
              variant="contained"
              className="h-8 border"
              sx={{
                backgroundColor: "#e53935",
                color: "#ffeb3b",
                fontWeight: "550",
                "&:hover": {
                  backgroundColor: "#ffeb3b", // Darker background color on hover
                  color: "#e53935", // Font color on hover (if needed)
                },
              }}
              onClick={showDish}
            >
              See added dishes
            </Button>
          </Link>
          &nbsp;&nbsp;&nbsp;
          <Link to="/getdish">
            <Button
              variant="contained"
              className="h-8 border"
              sx={{
                backgroundColor: "#e53935",
                color: "#ffeb3b",
                fontWeight: "550",
                "&:hover": {
                  backgroundColor: "#ffeb3b", // Darker background color on hover
                  color: "#e53935", // Font color on hover (if needed)
                },
              }}
              onClick={getDish}
            >
              Generate Dish
            </Button>
          </Link>
        </p>
      </div>
    </div>
  );
}
