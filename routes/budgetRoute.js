const route = require("express").Router();

const { protect } = require("../middlewares/authMiddleware");
const { setBudget, viewBudget } = require("../controller/budgetController");

route.post("/setbudget", protect, setBudget);
route.get("/viewbudget", protect, viewBudget);

exports = module.exports = route;