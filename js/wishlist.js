const wishlistContainer = document.getElementById("wishlist");

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

if(wishlist.length === 0){
  wishlistContainer.innerHTML = "<h3>No items in wishlist</h3>";
}else{

  wishlist.forEach(item => {

    wishlistContainer.innerHTML += `
      <div class="product-card">

        <img src="${item.image}" class="product-img">

        <h3>${item.name}</h3>

        <p class="price">₹${item.price}</p>

        <div class="product-buttons">

          <button class="cart-btn" onclick="addToCart('${item._id}')">
            Add to Cart
          </button>

          <button class="buy-btn" onclick="buyNow('${item._id}')">
            Buy Now
          </button>

        </div>

      </div>
    `;
  });

}