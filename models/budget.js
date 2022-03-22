const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    totalBudget: {
        type: Number
    }
});

const Budget = new mongoose.model("Budget", budgetSchema);

exports = module.exports = Budget;