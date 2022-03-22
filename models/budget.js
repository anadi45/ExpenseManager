const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    totalBudget: {
        type: Number,
        default: 0
    }
});

const Budget = new mongoose.model("Budget", budgetSchema);

exports = module.exports = Budget;