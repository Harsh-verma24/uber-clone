const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require("./src/db/db.js")
const cookieParser = require('cookie-parser');
const userRoutes = require("./src/routes/user.route.js")

connectDB();
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/user",userRoutes);

app.get('/',(req,res)=>{
    res.send("hello from server");
})

module.exports =app;