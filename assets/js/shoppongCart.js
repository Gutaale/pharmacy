
let cartItems = document.querySelector(".cart-items");
const cartClose=document.querySelector('#closeCart');
const cartModel=document.querySelector('.cart-model');
const checkOutBtn = document.querySelector("#checkout");



cartClose.addEventListener('click', (e) => {   
    closeCart()
 }); 

document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();
    renderCart();
});

window.onclick=function(event){
    if(event.target==cartModel){
        closeCart()
        return
    }
  
  }
checkOutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let drugs= JSON.parse(localStorage.getItem("drugs")) || [];
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
  
    // Here you can implement the checkout logic, like redirecting to a payment page
    alert("Proceeding to checkout...");
    // For now, we will just clear the cart
    localStorage.removeItem("cart");
    // renderCart();
    setTimeout(() => {
      alert("Thank you for your purchase!");
      closeCart();
    }, 1000);
  }); 
function renderCart() {
    let cart = JSON.parse(localStorage.getItem("cart"));
    console.log('cart',cart);
    cartItems.innerHTML = cart
      .map(
        (item) => `
  
      <div class="cart-item">
        <img src="${item.image}" alt="${item.title}">
        <div class="cart-item-details">
          <h4>${item.title}</h4>
           <p>$${item.price.toFixed(2)} × ${item.quantity}</p>
        </div>
        <div class="cart-item-actions">
          <button class="quantity-btn" data-id="${
            item.id
          }" data-action="decrease">-</button>
          <span>${item.quantity}</span>
          <button class="quantity-btn" data-id="${
            item.id
          }" data-action="increase">+</button>
        </div>
      </div>
    `
      )
      .join("");
      calculateCartItems();

    cartItems.querySelectorAll(".quantity-btn").forEach((quantityBtn) => {
      quantityBtn.addEventListener("click", () => {
        // const id = quantityBtn.dataset.id;
        // const action = quantityBtn.dataset.action;
        const { id, action } = quantityBtn.dataset;
  
        let cartItem = cart.find((crt) => crt.id == id);
  
        if (action == "increase") {
          cartItem.quantity += 1;
          localStorage.setItem("cart", JSON.stringify(cart));
        } else if (action == "decrease") {
          cartItem.quantity -= 1;
          if (cartItem.quantity === 0) {
            cart = cart.filter((crt) => crt.id != id);
          }
          localStorage.setItem("cart", JSON.stringify(cart));
        }
        // countItemsInTheCart();
        renderCart();
      });
    });
  }
  

  function countItemsInTheCart() {
    // let cartCount = document.querySelector("#cartCount");
    // console.log(cartCount);
    // let cart = JSON.parse(localStorage.getItem("cart")) || [];
    // cartCount.textContent = cart.length;
    calculateCartItems();
  }
  
  function calculateCartItems() {
    let cartTotal = document.querySelector("#cartTotal");
  
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = cart.reduce((acc, item) => acc + item.quantity * item.price, 0);
    cartTotal.textContent = total.toFixed(2);
  }

  function closeCart() {
    window.location.href="products.html";
}