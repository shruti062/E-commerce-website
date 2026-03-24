const API = "http://localhost:3000";

// GET ID FROM URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// FETCH PRODUCT
fetch(API + "/products")
.then(res => res.json())
.then(products => {

  const product = products.find(p => p._id === id);

  if(!product){
    alert("Product not found");
    return;
  }

  // SET DATA IN HTML
  document.getElementById("product-img").src = product.image;
  document.getElementById("product-name").innerText = product.name;
  document.getElementById("product-price").innerText = "₹" + product.price;
  document.getElementById("product-desc").innerText = product.description;

  // STORE FOR CART
  window.currentProduct = product;

});

// ADD TO CART
function addToCart(){

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push(window.currentProduct);

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Product Added To Cart");

}