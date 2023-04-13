const express = require("express");
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
const db = require("./config/dbConfig");
db();

app.use("/", require("./routes/otpRoutes"));

app.get("/user", function(req, res){
  
    var name = req.query.name
    var age = req.query.age
      
    console.log("Name :", name)
    console.log("Age :", age)
})


const PORT = 5000;

app.listen(PORT, () => {
    console.log('Sever started at PORT', PORT);
});