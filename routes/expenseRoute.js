const route = require("express").Router();

const { protect } = require("../middlewares/authMiddleware");
const { viewExpenses, createExpense, deleteExpense } = require("../controller/expenseController");


route.get("/viewexpenses", protect, viewExpenses);
route.post("/createexpense", protect, createExpense);
route.delete("/deleteexpense", deleteExpense);

exports = module.exports = route;