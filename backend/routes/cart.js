const express = require("express");
const router = express.Router();

let cart = [];


router.post("/add",(req,res)=>{

cart.push(req.body);

res.json({message:"Added to Cart"});

});


router.get("/",(req,res)=>{

res.json(cart);

});


router.delete("/remove/:id",(req,res)=>{

cart = cart.filter(item => item._id != req.params.id);

res.json({message:"Removed from Cart"});

});


module.exports = router;