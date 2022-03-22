const route = require("Express").Router();

const { signup, login } = require("../controller/userController");

route.post("/signup", signup);
route.post("/login", login);
route.get("/check", (req, res) => {
    res.send("ok")
})


exports = module.exports = route;