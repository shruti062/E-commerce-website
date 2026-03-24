const ordersContainer = document.getElementById("orders");

let orders = JSON.parse(localStorage.getItem("orders")) || [];

if (orders.length === 0) {
  ordersContainer.innerHTML = "<h3>No orders found</h3>";
} else {
 orders.forEach((order, index) => {

  let itemsHTML = "";

  order.items.forEach(item => {
    itemsHTML += `
      <div style="display:flex; gap:10px; margin:10px 0;">
        <img src="${item.image}" width="60">
        <div>
          <h4>${item.name}</h4>
          <p>₹${item.price}</p>
        </div>
      </div>
    `;
  });

  ordersContainer.innerHTML += `
    <div class="order-card">
      <h3>Order Date: ${order.date}</h3>
      ${itemsHTML}
      
      <button onclick="deleteOrder(${index})" class="remove-btn">
        Delete Order
      </button>
    </div>
  `;
});
// DELETE SINGLE ORDER
function deleteOrder(index){
  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  if(confirm("Are you sure you want to delete this order?")){
    orders.splice(index, 1);
    localStorage.setItem("orders", JSON.stringify(orders));
    location.reload();
  }
}

// CLEAR ALL ORDERS
function clearOrders(){
  if(confirm("Delete all orders?")){
    localStorage.removeItem("orders");
    location.reload();
  }
}
}