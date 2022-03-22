const route = require("Express").Router();

const { signup, login, logout } = require("../controller/userController");

route.post("/signup", signup);
route.post("/login", login);
route.get("/logout", logout);

exports = module.exports = route;