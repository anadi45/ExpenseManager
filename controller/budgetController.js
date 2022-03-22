const Budget = require("../models/budget");

const setBudget = async(req, res) => {
    try {
        const { budget } = req.body;
        const id = req.rootuser._id;

        if (!budget) {
            return res.status(400).send({
                message: "Fill all the details"
            });
        }

        const findBudget = await Budget.find({ user: id });

        if (findBudget.length === 0) {

            const newBudget = new Budget({
                user: id,
                totalBudget: budget
            });

            const saveBudget = await newBudget.save();

            if (saveBudget) {
                return res.status(201).send({
                    message: "Budget succesfully created"
                });
            } else {
                return res.status(406).send({
                    message: "Error"
                });
            }
        } else {

            const updateBudget = await Budget.updateOne({ user: id }, { totalBudget: budget });

            if (updateBudget) {
                return res.status(201).send({
                    message: "Budget succesfully updated"
                });
            } else {
                return res.status(406).send({
                    message: "Couldn't update budget"
                })
            }
        }
    } catch (error) {
        console.log(error);
    }
}

exports = module.exports = {
    setBudget
}