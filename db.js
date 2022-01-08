const mongoose = require("mongoose");
const database = process.env.DB;
const password = process.env.PASSWORD;
mongoose.connect(`mongodb+srv://anadi45:${password}@cluster0.klhde.mongodb.net/${database}?retryWrites=true&w=majority`, { useUnifiedTopology: true, useNewUrlParser: true });

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