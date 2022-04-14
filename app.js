require("dotenv").config();
const express = require("express");
const path = require("path");
const port = process.env.PORT || 3000;
const app = express();
const connectDB = require("./config/db");
const cors = require("cors");
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: true }));
app.use("/", express.static(path.join(__dirname, "public")));
app.use("/login", express.static(path.join(__dirname, "public/login.html")));
app.use("/signup", express.static(path.join(__dirname, "public/signup.html")));
app.use("/home", express.static(path.join(__dirname, "public/home.html")));



const userRoute = require("./routes/userRoute");
const expenseRoute = require("./routes/expenseRoute");
const budgetRoute = require("./routes/budgetRoute");

app.use("/api/v1/user", userRoute);
app.use("/api/v1/expense", expenseRoute);
app.use("/api/v1/budget", budgetRoute);

app.use("*", (req, res) => {
    res.send("404 page not found")
});

const serverStart = async(port) => {
    await connectDB();
    app.listen(port, () => {
        console.log(`http://localhost:${port}`);
    })
}

serverStart(port);