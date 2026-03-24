const API = "http://localhost:3000";

const container = document.getElementById("products");
const searchInput = document.getElementById("searchInput");

let allProducts = [];

// ================= FETCH PRODUCTS =================
fetch(API + "/products")
.then(res => res.json())
.then(products => {

  allProducts = products;

  displayProducts(products);

});

// ================= DISPLAY FUNCTION =================
function displayProducts(products){

  if(!container) return;

  container.innerHTML = "";

  if(products.length === 0){
    container.innerHTML = "<h3 style='text-align:center'>No products found</h3>";
    return;
  }

  products.forEach(product => {

   container.innerHTML += `
  <div class="product-card" onclick="openProduct('${product._id}')">

    <div class="wishlist-icon"
      onclick="event.stopPropagation(); toggleWishlist('${product._id}')">
      ❤️
    </div>

    <img src="${product.image}" class="product-img">

    <h3>${product.name}</h3>

    <p class="price">₹${product.price}</p>

    <div class="product-buttons">

      <button class="cart-btn"
        onclick="event.stopPropagation(); addToCart('${product._id}')">
        Add to Cart
      </button>

      <button class="buy-btn"
        onclick="event.stopPropagation(); buyNow('${product._id}')">
        Buy Now
      </button>

    </div>

  </div>
`;
  });
}
 //================= OPEN PRODUCT =================
    function openProduct(id){
  window.location.href = "product.html?id=" + id;
}


// ================= SEARCH FUNCTION =================
if(searchInput){
  searchInput.addEventListener("input", function(){

    const value = this.value.toLowerCase();

    const filteredProducts = allProducts.filter(product =>
      product.name.toLowerCase().includes(value)
    );

    displayProducts(filteredProducts);

  });
}

// ================= ADD TO CART =================
function addToCart(id){

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const product = allProducts.find(p => p._id === id);

  if(!product){
    alert("Product not found");
    return;
  }

  cart.push(product);

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Product Added To Cart");
}

// ================= BUY NOW =================
function buyNow(id){

  let cart = [];

  const product = allProducts.find(p => p._id === id);

  if(!product){
    alert("Product not found");
    return;
  }

  cart.push(product);

  localStorage.setItem("cart", JSON.stringify(cart));

  window.location.href = "checkout.html";
}
function toggleWishlist(id){

  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  const product = allProducts.find(p => p._id === id);

  const index = wishlist.findIndex(p => p._id === id);

  if(index > -1){
    wishlist.splice(index, 1);
    alert("Removed from Wishlist ❌");
  } else {
    wishlist.push(product);
    alert("Added to Wishlist ❤️");
  }

  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}
function getStars(rating){

let stars = "";

for(let i=1;i<=5;i++){
if(i <= rating){
stars += "⭐";
}else{
stars += "☆";
}
}

return stars;
}