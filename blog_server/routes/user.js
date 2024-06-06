const express = require("express");
const User = require('../models/users.models');
const config = require("../config");
const jwt = require("jsonwebtoken");
const { checkToken } = require('../api/verifyToken');


const router = express.Router();

router.route('/:username').get(checkToken, async (req, res) => {
    try{
    const a = await User.find({username : req.params.username})
    if(!a){
        return res.status(404).json({msg: "User not found"});
    }
    const msg = {
        data : a,
        username: req.params.username,
    };
    return res.json(msg);
}
    catch(err){
        res.status(400).json(err.message)
    }
});

router.route("/login").post(async (req, res) => {
    try {
        const result = await User.findOne({ username: req.body.username });
        if (!result) {
            return res.status(403).json("Username incorrect");
        }
        if (result.password === req.body.password) {
            let token = jwt.sign({username: req.body.username}, config.key, {expiresIn: "24h"});
            res.json({
                token: token,
                msg: "success",
            });
        } else {
            res.status(403).json("password is incorrect");
        }
    } catch (err) {
        return res.status(500).json({ msg: err });
    }
});

router.route('/register').post((req, res) => {
    console.log("register ONGOING  ");
    const user = new User({
        username : req.body.username,
        password : req.body.password,
        email : req.body.email

    });
user.save()
    .then(() => {
        console.log("register DONE  ");
        res.status(200).json('User added!')})
   
    .catch(err => {res.status(500).json('Error: ' + err)});

    });

router.route("/update/:username").patch(checkToken, async (req, res)=> {
    try{
    const updateuser = await User.findOneAndUpdate(
        {username : req.params.username}, 
        {$set:{ password:  req.body.password}},
        {new : true}
    );
    if(!updateuser){
        return res.status(404).json({msg: "User not found"});
    }
    const msg = {
    message : "user updated succesfully",
    username : req.params.username
    }
    return res.json(msg)

}

catch (err){
    res.status(500).json(err.message)
}
});
  
router.route("/delete/:username").delete(checkToken, async (req, res) => {
    try {
        const deleteuser = await User.findOneAndDelete(
            { username: req.params.username });
        if (!deleteuser){
            return res.status(404).json({ msg: 'User not found' });
        }
        const msg = {
            msg: "user Deleted",
            username: req.params.username,
        };
        return res.json(msg);

    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
});


module.exports = router;