const route = require("express").Router();

const { setBudget } = require("../controller/budgetController");

route.post("/setbudget", setBudget);

exports = module.exports = route;