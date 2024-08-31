import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import UserProfileContext from "../context/userContext";
import { Button } from "@mui/material";

const VITE_APP_API_URL = import.meta.env.VITE_APP_API_URL;

export default function Showdish() {
  const navigate = useNavigate();
  const location = useLocation(); // Allows us to access the state passed to IDBTransaction, i.e. the dishes
  const [dishes, setDishes] = useState(location.state?.dishes || []);
  const { isAuthenticated, userDetails, jwtToken } =
    useContext(UserProfileContext);

  useEffect(() => {
    if (isAuthenticated) {
      showRemainingDishes();
    } else {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const deleteDish = async (id) => {
    if (isAuthenticated) {
      try {
        console.log("inside try block");
        console.log(id);
        console.log(userDetails._id);

        // Perform DELETE request with query parameters
        const response = await axios.delete(
          `${VITE_APP_API_URL}/api/dish/deletedish`,
          {
            params: { id, userId: userDetails._id },
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
            withCredentials: true,
          }
        );

        console.log("Request sent");

        if (response.status === 200) {
          // Fetch remaining dishes after deletion
          showRemainingDishes();
          console.log("Deleted");
        } else {
          console.log("Deleting the dish failed");
        }
      } catch (error) {
        console.error("Error deleting dish:", error);
      }
    } else {
      alert("Please Login");
      navigate("/login");
    }
  };

  const showRemainingDishes = async () => {
    try {
      console.log("Fetching remaining dishes with Authorization");
      console.log(userDetails._id);
      const response = await axios.get(
        `${VITE_APP_API_URL}/api/dish/showdish`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setDishes(response.data); // Update state with fetched dishes
        console.log("Dishes updated");
      } else {
        console.log("Failed to fetch dishes");
      }
    } catch (error) {
      console.error("Error fetching dishes:", error);
    }
  };

  return (
    <div className="pt-8 gap-20 flex flex-col justify-around">
      <h1 className="text-center text-4xl font-bold">Added Dishes</h1>
      <div className="flex justify-center items-center mb-16">
        {dishes.length > 0 ? (
          <div className="w-full max-w-4xl max-h-[400px] overflow-y-auto scrollbar scrollbar-none">
            <table className="table-auto w-full border border-black">
              <thead className="border border-black">
                <tr className="border border-black">
                  <th className="hidden">ID</th>
                  <th className="border border-black p-4 text-2xl">Name</th>
                  <th className="border border-black p-4 text-2xl">Category</th>
                  <th className="border border-black p-4 text-2xl">Type</th>
                </tr>
              </thead>
              <tbody>
                {dishes.map((dish) => (
                  <tr key={dish._id}>
                    <td className="hidden">{dish._id}</td>
                    <td className="border border-black p-4 text-xl">
                      {dish.name}
                    </td>
                    <td className="border border-black p-4 text-xl">
                      {dish.category}
                    </td>
                    <td className="border border-black p-4 text-xl">
                      {dish.type}
                    </td>
                    <td className="border border-black p-4 text-xl">
                      <Button onClick={() => deleteDish(dish._id)}>
                        <DeleteOutlineIcon
                          color="secondary"
                          sx={{
                            color: "#e53935",
                            fontWeight: "550",
                            "&:hover": {
                              transition: "0.2s ease-in",
                              color: "#e53935",
                              fontWeight: "550", // Font color on hover (if needed)
                            },
                          }}
                        />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No dishes found.</p>
        )}
      </div>
    </div>
  );
}
