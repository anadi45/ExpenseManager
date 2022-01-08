const route = require("express").Router();
const Expense = require("../db").Expense;
const Total = require("../db").Total;

//Returning expense data from database
route.get("/expense", (req, res) => {
    Expense.find({}, (err, expenses) => {
        if (err) {
            res.status(500).send({
                error: "Could not find any expenses"
            });
        } else {
            res.status(200).send(expenses);
        }
    });
});

//Saving expense to database
route.post("/expense", (req, res) => {

    Expense.create({
        title: req.body.title,
        amount: req.body.amount
    }, (err, expense) => {
        if (err) {
            res.status(501).send({
                error: "Could not post the expense"
            });
        } else {
            res.status(201).send(expense);
        }
    });
});

//Deleting expense from database
route.delete("/expense", (req, res) => {
    Expense.deleteOne({
        title: req.body.title,
        amount: req.body.amount
    }, (err) => {
        if (err) {
            res.send({
                error: "Could not delete"
            })
        } else {
            res.send("Deleted succesfully");
        }
    });
});

//Returning budget from database
route.get("/total", (req, res) => {
    Total.find({}, (err, total) => {
        if (err) {
            res.status(500).send({
                error: "Could not get any total amount"
            });
        } else {
            res.status(200).send(total);
        }
    });
});

//Saving budget to database
route.post("/total", (req, res) => {
    Total.create({
        totalAmount: req.body.totalAmount
    }, (err, total) => {
        if (err) {
            res.status(501).send({
                error: "Could not post the total amount"
            });
        } else {
            res.status(201).send(total);
        }
    });
});

exports = module.exports = {
    route
}