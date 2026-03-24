function updateCounts(){

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

let cartCount = document.getElementById("cart-count");
let wishCount = document.getElementById("wishlist-count");

if(cartCount) cartCount.innerText = cart.length;
if(wishCount) wishCount.innerText = wishlist.length;

}

updateCounts();