const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderId: String,
  date: String,
  items: Array,
  total: Number,
  address: Object
});

module.exports = mongoose.model("Order", orderSchema);