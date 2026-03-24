const express = require("express");
const router = express.Router();

const Order = require("../models/Order");

// ADD ORDER
router.post("/add", async (req,res)=>{
    try{
        console.log("Order Received:", req.body);

        const order = new Order(req.body);

        const savedOrder = await order.save();

        console.log("Order Saved in DB ✅", savedOrder);

        res.json({message:"Order Saved", data: savedOrder});

    }catch(err){
        console.error("❌ Error saving order:", err);
        res.status(500).json({message:"Error saving order"});
    }
});
// GET ALL
router.get("/", async (req,res)=>{
const orders = await Order.find();
res.json(orders);
});

module.exports = router;