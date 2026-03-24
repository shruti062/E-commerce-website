const express = require("express");
const cors = require("cors");

const app = express();

require("./db");

app.use(cors());
app.use(express.json());

app.use("/users", require("./routes/users"));
app.use("/products", require("./routes/products"));
app.use("/cart", require("./routes/cart"));
const orderRoutes = require("./routes/orders");
app.use("/orders", orderRoutes);

app.listen(3000, () => {
console.log("Server running on port 3000");
});
