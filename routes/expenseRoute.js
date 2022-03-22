const route = require("express").Router();

const { protect } = require("../middlewares/authMiddleware");
const { viewExpenses, createExpense } = require("../controller/expenseController");


route.get("/viewexpenses", protect, viewExpenses);
route.post("/createexpense", protect, createExpense);

exports = module.exports = route;