const express = require("express");
const router = express.Router({ mergeParams: true });
const Dish = require("../Models/dish.js");
const dishControllers = require("../Controllers/dishControllers.js");
const isLoggedIn = require("../middleware.js"); //We will make this middleware later and then add it to the "SHOWDISH", "ADD DISH" & "GENERATE DISH"

router.post(
  "/adddish",
  isLoggedIn, //Add later when "JWT" tokens are added
  dishControllers.addDish
);

router.get(
  "/showdish",
  isLoggedIn, //Add later when "JWT" tokens are added
  dishControllers.showDish
);

router.get(
  "/getdish",
  isLoggedIn, //Add later when "JWT" tokens are added
  dishControllers.getDish
);

router.delete(
  "/deletedish",
  isLoggedIn, //Add later when "JWT" tokens are added
  dishControllers.deleteDish
);

router.post(
  "/generateDish",
  isLoggedIn, //Add later when "JWT" tokens are added
  dishControllers.generateDish
);

router.get(
  "/getNearbyRestaurants",
  isLoggedIn,
  dishControllers.searchNearbyRestaurants
);

module.exports = router;
