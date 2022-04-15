const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../models/user");
const jwtSecret = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const mail_user = process.env.MAIL_USER;
const mail_password = process.env.MAIL_PASSWORD;

//@route    POST /signup
//@descr    Signup an user
//@access   Public

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
            return res.status(400).send({
                message: "Email already registered"
            });
        }

        const findPhone = await User.findOne({ phone: phone });

        if (findPhone) {
            return res.status(400).send({
                message: "Phone already registered"
            });
        }

        bcrypt.hash(password, saltRounds, async function(err, hash) {
            if (err) {
                console.error("Password unable to be hashed");
            } else {
                const newUser = new User({
                    name: name,
                    email: email,
                    phone: phone,
                    password: hash
                });
                const signedUp = await newUser.save();

                if (signedUp) {
                    return res.status(201).send({
                        message: "User successfully signed up",
                    });
                } else {
                    return res.status(406).send({
                        message: "Sign up failed"
                    });
                }
            }
        });

    } catch (error) {
        console.error(error);
    }
}

//@route    POST /login
//@descr    Login an user
//@access   Public

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
                tokens.push({ token: token });
                findUser.tokens = tokens;
                const saveToken = await findUser.save();

                if (saveToken) {
                    return res.cookie("jwtoken", token, {
                        httpOnly: true,
                        sameSite: 'none',
                        secure: true
                    }).status(201).send({ token });
                } else {
                    return res.status(406).send({
                        message: "Error"
                    });
                }
            } else {
                return res.status(400).send({
                    message: "Invalid credentials"
                });
            }
        } else {
            return res.status(400).send({
                message: "Invalid credentials"
            });
        }
    } catch (error) {
        console.error(error);
    }
}

//@route    GET /logout
//@descr    Logout user
//access    Public

const logout = (req, res) => {
    try {
        res.clearCookie("jwtoken", { path: "/" });
        return res.status(200).send({
            message: "User logged out"
        });
    } catch (error) {
        console.log(error);
    }
}

//@route    GET /profiledetails
//@descr    Get all profile details for user
//@access   Private

const profileDetails = async(req, res) => {
    try {
        const id = req.rootuser._id;
        const findDetails = await User.find({ _id: id }).select("-_id -password -otp -tokens -__v");

        if (findDetails) {
            return res.status(200).send(findDetails);
        } else {
            return res.status(201).send({
                message: "No details found"
            });
        }
    } catch (error) {
        console.log(error);
    }
}

//@route    PATCH /changepassword
//@descr    Change Password
//@access   Private

const changePassword = async(req, res) => {
    try {
        const { newPassword } = req.body;

        if (!newPassword) {
            return res.status(400).send({
                message: "Enter new password"
            });
        }

        const id = req.rootuser._id;

        bcrypt.hash(newPassword, saltRounds, async function(err, hash) {
            if (err) {
                console.error("Password unable to be hashed");
            } else {

                const changed = await User.findOneAndUpdate({ _id: id }, { password: hash });

                if (changed) {
                    return res.status(201).send({
                        message: "Password succesfully changed"
                    });
                } else {
                    return res.status(406).send({
                        message: "Unable to change the password"
                    });
                }
            }
        });
    } catch (error) {
        console.log(error);
    }
}

//@route    PATCH /changename
//@descr    Change name
//@access   Private

const changeName = async(req, res) => {
    try {

        const { newName } = req.body;
        const id = req.rootuser._id;

        if (!newName) {
            return res.status(400).send({
                message: "Enter new name"
            });
        }

        const changed = await User.findOneAndUpdate({ _id: id }, { name: newName });

        if (changed) {
            return res.status(201).send({
                message: "Name succesfully changed"
            });
        } else {
            return res.status(406).send({
                message: "Unable to change the name"
            });
        }
    } catch (error) {
        console.log(error);
    }
}

//@route    POST /mailpassword
//@descr    Mail new password
//@access   Public

const mailPassword = async(req, res) => {
    try {
        const { mail } = req.body;

        if (!mail) {
            return res.status(400).send({
                message: "Enter mail"
            });
        }

        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: mail_user,
                pass: mail_password
            }
        });

        let chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let passwordLength = 12;
        let password = "";

        for (let i = 0; i <= passwordLength; i++) {
            let randomNumber = Math.floor(Math.random() * chars.length);
            password += chars.substring(randomNumber, randomNumber + 1);
        }

        bcrypt.hash(password, saltRounds, async function(err, hash) {
            if (err) {
                console.error("Password unable to be hashed");
            } else {

                const changed = await User.findOneAndUpdate({ email: mail }, { password: hash });

                if (changed) {
                    const options = {
                        from: mail_user,
                        to: mail,
                        subject: "Expense-Manager Password Reset Request",
                        html: `New Password for your account is ${password}`
                    }

                    transport.sendMail(options, (error, info) => {
                        if (error) {
                            return res.status(400).send({
                                message: "Unable to send mail"
                            });
                        } else {
                            return res.status(200).send({
                                message: "Mail sent"
                            });
                        }
                    });
                } else {
                    return res.status(406).send({
                        message: "Unable to change the password"
                    });
                }
            }
        });
    } catch (error) {
        console.log(error);
    }
}

exports = module.exports = {
    signup,
    login,
    logout,
    profileDetails,
    changePassword,
    changeName,
    mailPassword
}