const express = require("express");
const mongoose =require('mongoose');
const userRouter = require('./user');


const Port = process.env.port || 5000;
const app = express();
app.use(express.json());
const mongoDBUrl = 'mongodb+srv://pratham:neebal@cluster0.fnmcpip.mongodb.net/Neebal?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoDBUrl, { useNewUrlParser: true})
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));



app.route("/").get((req,res) => res.json("your first rest api"));
app.use("/user", userRouter);

app.listen(Port, () => console.log('Server is running on port ${Port}'));