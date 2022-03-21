const mongoose = require("mongoose");
const expenseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
});

const totalSchema = new mongoose.Schema({
    totalAmount: {
        type: Number,
        required: true
    }
});

const Expense = new mongoose.model("Expense", expenseSchema);
const Total = new mongoose.model("Total", totalSchema);

exports = module.exports = {
    Expense,
    Total
}