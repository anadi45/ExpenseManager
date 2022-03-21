import { Schema, model } from "mongoose";

const expenseSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
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

const Expense = new model("Expense", expenseSchema);

exports = module.exports = Expense;