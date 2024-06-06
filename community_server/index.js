const express = require("express");
const mongoose =require('mongoose');
const userRouter = require('./routes/user');


const Port = process.env.port || 5000;
const app = express();
app.use(express.json());
const mongoDBUrl = "mongodb://localhost:27017/neebal";

const connectDB = async () => {
  try {
    await mongoose.connect(mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

connectDB();


app.route("/").get((req,res) => res.json("your first rest api"));
app.use("/user", userRouter);

app.listen(Port, () => console.log('Server is running on port ${Port}'));