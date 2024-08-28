import { useContext } from "react";
import "../App.css";
import Navbarelements from "./Navbarelements";
import { Link } from "react-router-dom"; //Link is used to give useNavigate a link to certain element
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserProfileContext from "../../Context/userContext";

// import RestaurantIcon from "@mui/icons-material/Restaurant";

const VITE_APP_API_URL = import.meta.env.VITE_APP_API_URL;

export default function Navbar() {
  //isAuthenticated state is used to display seperate navbar elements depending on whether the user is loggedin or not
  const {
    userDetails,
    isAuthenticated,
    setIsAuthenticated,
    jwtToken,
    setUserDetails,
    setJwtToken,
  } = useContext(UserProfileContext);

  const navigate = useNavigate();
  // const [loading, setLoading] = useState(true);

  const profilePicUrl = userDetails?.profilePic;

  const handleLogout = async () => {
    console.log("Logout Request Sent From Frontend");
    if (isAuthenticated) {
      console.log("jwtToken", jwtToken);
      try {
        console.log("Inside Try Block For Loggin Out");
        const response = await axios.post(
          `${VITE_APP_API_URL}/api/authenticate/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
            withCredentials: true,
          }
        );

        // console.log(response, "Response");
        // Clear all user-related data
        setIsAuthenticated(false);
        localStorage.removeItem("jwtToken");
        setJwtToken(null);
        localStorage.removeItem("userDetails");
        setUserDetails(null);
        console.log("User successfully logged out from Frontend");
        navigate("/");
      } catch (error) {
        console.error("Error logging out:", error);
      }
    }
  };

  return (
    <div className="navbar glass sticky top-0  pt-4">
      <div className={"bg-bg-red mx-auto max-w-6xl rounded-3xl"}>
        {" "}
        {/*I want to set the width of the nav bar it should not change according to the page */}
        <div className="h-12 flex justify-between items-center  text-xl font-bold">
          <div className=" text-center">
            <Link to="/">
              {/* Navbarelements are seperate elements for displaying on the navbar. Which Navbarelement will be displayed will depend on the state variable isAuthenticated */}
              <Navbarelements title={`@kyakhanahai.com`} />
            </Link>
          </div>
          <div className="flex justify-between items-center text-center pr-8">
            {isAuthenticated ? (
              // COnditional rendering based on the state variable value
              <div>
                <div onClick={handleLogout} className="cursor-pointer">
                  <Navbarelements title={"Logout"} />
                </div>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Navbarelements title={"Login"} />
                </Link>
                <Link to="/signup">
                  <Navbarelements title={"Signup"} />
                </Link>
              </>
            )}
            {isAuthenticated ? (
              // COnditional rendering based on the state variable value
              <div>
                <Link to="/profile">
                  <div className="ml-20 bg-bg-red text-white">
                    {profilePicUrl ? (
                      <img
                        src={profilePicUrl}
                        alt=""
                        className="h-8 rounded-full"
                      />
                    ) : (
                      <p className=" w-8 rounded-full border-2">U</p>
                    )}
                  </div>
                </Link>
              </div>
            ) : (
              <></>
            )}
            <Link to="/contactUs">
              <Navbarelements title={"Contact Us"} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
