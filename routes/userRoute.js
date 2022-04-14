const route = require("express").Router();

const { protect } = require("../middlewares/authMiddleware");
const { signup, login, logout, profileDetails, changePassword, changeName } = require("../controller/userController");

route.post("/signup", signup);
route.post("/login", login);
route.get("/logout", logout);
route.get("/profiledetails", protect, profileDetails);
route.patch("/changepassword", protect, changePassword);
route.patch("/changename", protect, changeName);

exports = module.exports = route;