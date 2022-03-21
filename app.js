require("dotenv").config();
const express = require("express");
const path = require("path");
const port = process.env.PORT || 3000;
const app = express();
const connectDB = require("./config/db");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static(path.join(__dirname, "public")));

app.use("/home", (req, res) => {
    res.sendFile(path.join(__dirname, "public/static/home.html"))
});

app.use("/api", require("./routes/api").route);


const serverStart = async(port) => {
    await connectDB();
    app.listen(port, () => {
        console.log(`http://localhost:${port}`);
    })
}

serverStart(port);