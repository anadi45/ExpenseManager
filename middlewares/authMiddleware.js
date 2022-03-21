import jwt from "jsonwebtoken";
import User from "../models/user";
const jwtSecret = process.env.JWT_SECRET;

const protect = async(req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, jwtSecret);

            req.rootuser = await User.findById(decoded._id).select("-password");
            next();
        } catch (error) {
            console.error(error);
            return res.status(401).send({
                message: "Unauthorized"
            });
        }

    }

    if (!token) {
        return res.status(401).send({
            message: "Unauthorized"
        });
    }
}

exports = module.exports = {
    protect
}