import { Schema, model } from "mongoose";

const budgetSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    totalBudget: {
        type: Number
    }
});

const Budget = new model("Budget", budgetSchema);

exports = module.exports = Budget;