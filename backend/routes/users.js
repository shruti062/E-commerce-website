const express = require("express");
const router = express.Router();

const User = require("../models/User");

router.post("/signup", async(req,res)=>{

const user = new User(req.body);

await user.save();

res.json({message:"User Registered"});

});


router.post("/login", async(req,res)=>{

const {email,password} = req.body;

const user = await User.findOne({email,password});

if(user){

res.json({
message:"Login Success",
user:user
});

}else{

res.json({
message:"Invalid Credentials"
});

}

});

module.exports = router;