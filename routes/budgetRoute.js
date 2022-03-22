const route = require("express").Router();

const { protect } = require("../middlewares/authMiddleware");
const { setBudget } = require("../controller/budgetController");

route.post("/setbudget", protect, setBudget);

exports = module.exports = route;