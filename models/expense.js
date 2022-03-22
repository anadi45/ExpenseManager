const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Expense = new mongoose.model("Expense", expenseSchema);

exports = module.exports = Expense;