const express = require("express");
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
const db = require("./config/dbConfig");
db();

app.use("/", require("./routes/otpUrlRoute"));

const PORT = 5000;

app.listen(PORT, () => {
    console.log('Sever started at PORT', PORT);
});