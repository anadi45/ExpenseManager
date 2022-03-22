const Expense = require("../models/expense");


//@route    GET /viewexpenses
//@descr    View all expenses for particular user
//@access   Private

const viewExpenses = async(req, res) => {
    try {
        const id = req.rootuser._id;

        const findExpenses = await Expense.find({ user: id });
        if (findExpenses) {
            return res.status(200).send(findExpenses);
        } else {
            res.status(406).send({
                message: "Couldn't fetch expenses"
            });
        }
    } catch (error) {
        console.log(error);
    }
}

//@route    POST /createexpense
//@descr    Create expense for user
//access    Private

const createExpense = async(req, res) => {
    try {
        const { title, amount } = req.body;
        const id = req.rootuser._id;

        if (!title) {
            return res.status(400).send({
                message: "Fill title"
            });
        }

        const newExpense = new Expense({
            user: id,
            title: title,
            amount: amount
        });

        const saved = await newExpense.save();

        if (saved) {
            return res.status(201).send({
                message: "Expense saved successfully"
            });
        } else {
            return res.status(406).send({
                message: "Unable to save the expense"
            });
        }
    } catch (error) {
        console.log(error);
    }
}

exports = module.exports = {
    viewExpenses,
    createExpense
}