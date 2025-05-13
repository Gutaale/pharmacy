const products =document.querySelector('.products')


// getDrugApi()


// getUsers();
countItemsInTheCart();
let currentDrugs = [];
let users=[];
let drugs=[];


window.addEventListener('DOMContentLoaded', () => {
    let drugs=JSON.parse(localStorage.getItem('drugs')) || [];
    if(drugs.length>0){
      loadPrducts(drugs)
      console.log('There is a drugs')
    }else{  
    getDrugApi();
    console.log('There is no drugs');
    }
  });

 





  // functions
async function getDrugApi(){
    try {
        const response= await fetch("../html/data.json");
        const data= await response.json()
        localStorage.setItem('drugs',JSON.stringify(data))
        console.log(data)
        loadPrducts(data)
    } catch (error) {
        console.log(error)
    }

}

function loadPrducts(product_list){
    currentDrugs=product_list;
    console.log(product_list)
    const newProducts = product_list.map(({ title, price, image, description, id }) => {
      return `<div class="product-items">
          <img src="${image}" alt="Products">
            <h3>${title}</h3>
            <p>${description}</p>
            <span>Price: $${price}</span>
            <button class="btn add-to-cart" data-id="${id}">Add to Cart</button>
        </div>
      `}).join("");
    products.innerHTML=newProducts;

    products.querySelectorAll(".add-to-cart").forEach((button) => {
        button.addEventListener("click", () => {
          const { id } = button.dataset;
          let product = currentDrugs.find((product) => product.id == id);
          // product.quantity = 1;
          addToCart(product);
        });
      });
}





function addToCart(item) {
    let carts = JSON.parse(localStorage.getItem("cart")) || [];
  
    let existItem = carts.find((cart) => cart.id == item.id);
  
    if (existItem) {
      existItem.quantity += 1;
    } else {
      carts.push({ ...item, quantity: 1 });
    }
  
    localStorage.setItem("cart", JSON.stringify(carts));
    countItemsInTheCart();
  }
  function countItemsInTheCart() {
    let cartCount = document.querySelector("#cartCount");
    console.log(cartCount);
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartCount.textContent = cart.length;
  }
  

 