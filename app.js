require("dotenv").config();
const express = require("express");
const path = require("path");
const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static(path.join(__dirname, "public")));

app.use("/api", require("./routes/api").route);

app.listen(3000, () => {
    console.log(`http://localhost:${port}`);
});