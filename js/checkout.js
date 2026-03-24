function generateOrderId(){
return "ORD" + Date.now(); // unique ID
}

function placeOrder(){

// ADDRESS
const name = document.getElementById("fullName").value.trim();
const phone = document.getElementById("phone").value.trim();
const address = document.getElementById("address").value.trim();
const city = document.getElementById("city").value.trim();
const pincode = document.getElementById("pincode").value.trim();

// PAYMENT
const cardNumber = document.getElementById("cardNumber").value.trim();
const cardName = document.getElementById("cardName").value.trim();
const expiry = document.getElementById("expiry").value.trim();
const cvv = document.getElementById("cvv").value.trim();

// VALIDATION
if(!name || !phone || !address || !city || !pincode){
alert("Please fill address details");
return;
}

if(!cardNumber || !cardName || !expiry || !cvv){
alert("Please fill payment details");
return;
}

// CART
let cart = JSON.parse(localStorage.getItem("cart")) || [];

if(cart.length === 0){
alert("Cart is empty");
return;
}

// TOTAL
let total = 0;
cart.forEach(item=>{
total += item.price * (item.quantity || 1);
});

// SHOW LOADER
document.getElementById("payment-loader").style.display = "block";

// FAKE PAYMENT DELAY (2 sec)
setTimeout(()=>{

// ORDER OBJECT
const orderData = {
  orderId: "ORD" + Date.now(),
  date: new Date().toLocaleString(),
  items: cart,
  total: total,   // calculate karo
  address: {
    name: name,
    phone: phone,
    address: address,
    city: city,
    pincode: pincode
  }
};


// SAVE LOCAL
let orders = JSON.parse(localStorage.getItem("orders")) || [];
orders.push(orderData);
localStorage.setItem("orders", JSON.stringify(orders));

// 🔥 BACKEND SAVE
fetch("http://localhost:3000/orders/add",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify(orderData)
})
.then(res => {
  if(!res.ok){
    throw new Error("API not working");
  }
  return res.json();
})
.then(data => console.log("Saved in MongoDB ✅"))
.catch(err => console.error("❌ Backend Error:", err));

// CLEAR CART
localStorage.removeItem("cart");

// UPDATE COUNT
updateCounts();

// SUCCESS
alert("Payment Successful 🎉\nOrder ID: " + orderData.orderId);

// REDIRECT
window.location.href = "orders.html";

},2000);

}