const cartContainer = document.getElementById("cart-items");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ================= LOAD CART =================
function loadCart(){

cartContainer.innerHTML = "";
let total = 0; // 🔥 reset every time

// EMPTY CART
if(cart.length === 0){
cartContainer.innerHTML = "<h3 class='empty-cart'>Cart is empty</h3>";
document.getElementById("checkout-btn").style.display = "none";
document.getElementById("total-price").innerText = "";
return;
}

document.getElementById("checkout-btn").style.display = "block";

// LOOP
cart.forEach((item,index) => {

if(!item) return;

// quantity default
if(!item.quantity){
item.quantity = 1;
}

// total calculation
total += item.price * item.quantity;

cartContainer.innerHTML += `

<div class="cart-card">

<div class="cart-left">
<img src="${item.image}" width="80">

<div class="cart-details">
<h3>${item.name}</h3>
<p>₹${item.price}</p>
</div>
</div>

<!-- QUANTITY -->
<div>
<button onclick="decreaseQty(${index})">➖</button>
<span>${item.quantity}</span>
<button onclick="increaseQty(${index})">➕</button>
</div>

<!-- REMOVE -->
<button class="remove-btn" onclick="removeItem(${index})">
Remove
</button>

</div>

`;
});

// SHOW TOTAL
document.getElementById("total-price").innerText =
"Total: ₹" + total;

// SAVE UPDATED CART
localStorage.setItem("cart", JSON.stringify(cart));

// UPDATE NAVBAR COUNT
updateCounts();
}

// ================= INCREASE =================
function increaseQty(index){
cart[index].quantity++;
loadCart();
}

// ================= DECREASE =================
function decreaseQty(index){
if(cart[index].quantity > 1){
cart[index].quantity--;
loadCart();
}
}

// ================= REMOVE =================
function removeItem(index){

cart.splice(index,1);

localStorage.setItem("cart", JSON.stringify(cart));

loadCart(); // 🔥 no reload
}

// ================= CHECKOUT =================
function goToCheckout(){
window.location.href = "checkout.html";
}

// ================= INIT =================
loadCart();