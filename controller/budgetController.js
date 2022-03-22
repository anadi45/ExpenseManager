const Budget = require("../models/budget");

const setBudget = async(req, res) => {
    try {
        const { budget } = req.body;
        const id = req.rootuser._id;

        const updateBudget = await Budget.findOneAndUpdate({ _id: id }, { totalBudget: budget });

        if (updateBudget) {
            return res.status(201).send({
                message: "Budget succesfully updated"
            });
        } else {
            res.status(400).send({
                message: "Couldn't set budget"
            })
        }
    } catch (error) {
        console.log(error);
    }
}

exports = module.exports = {
    setBudget
}