const bcrypt = require("bcrypt");
const saltRounds = 10;
import User from "../models/user";
const jwtSecret = process.env.JWT_SECRET;


const signup = async(req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        if (!name || !email || !phone || !password) {
            return res.status(400).send({
                message: "Fill all details"
            });
        }

        const findEmail = await User.findOne({ email: email });
        if (findEmail) {
            return res.status(406).send({
                message: "Email already registered"
            });
        }

        const findPhone = await User.findOne({ phone: phone });
        if (findPhone) {
            return res.status(406).send({
                message: "Phone already registered"
            });
        }

        let hashedPassword;
        bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
            if (err) {
                console.error("Password unable to be hashed");
            } else {
                hashedPassword = hash;
            }
        });

        const newUser = new User({
            name: name,
            email: email,
            phone: phone,
            password: hashedPassword
        });
        const signedUp = await newUser.save();

        if (signedUp) {
            return res.status(201).send({
                message: "User successfully signed up",
            });
        } else {
            return res.status().send({
                message: "Sign up failed"
            });
        }
    } catch (error) {
        console.error(error);
    }
}

const login = async(req, res) => {
    try {
        const { loginCred, password } = req.body;

        if (!loginCred || !password) {
            return res.status(400).send({
                message: "Fill all details"
            });
        }

        const findUser = await User.findOne({ $or: [{ email: loginCred }, { phone: loginCred }] });

        if (findUser) {
            const match = await bcrypt.compare(password, findUser.password);

            if (match) {
                let token = jwt.sign({ _id: findUser._id }, jwtSecret);
                let tokens = findUser.tokens;
                tokens.append({ token: token });
                findUser.tokens = tokens;
                const saveToken = await findUser.save();
                if (saveToken) {

                    localStorage.setItem("jwtoken", token);
                    return res.status(200).send({
                        message: "Login successfully"
                    });
                } else {
                    return res.status().send({
                        message: "Error"
                    });
                }
            } else {
                return res.status(400).send({
                    message: "Invalid credentials"
                });
            }

        }
    } catch (error) {
        console.error(error);
    }
}
exports = module.exports = {
    signup,
    login
}