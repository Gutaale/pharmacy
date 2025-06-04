const products =document.querySelector('.products')
const index =document.querySelector('#index')
const about =document.querySelector('#about1') 
const contact =document.querySelector('#contact1')
const searchInput = document.querySelector('#searchInput');
const searchButton = document.querySelector('#searchButton');
const categories = document.querySelector('#categories');

// getDrugApi()


// getUsers();
countItemsInTheCart();
let currentDrugs = [];
let users=[];
let drugs=[];

about.addEventListener('click', (e)=>{
    e.preventDefault();
    window.location.href='../index.html#about';
})
categories.addEventListener('change', (e) => {
    e.preventDefault();
    filterByCategory();
});
searchInput.addEventListener('keyup', (e) => {
    e.preventDefault();
    if (searchInput.value === '' || searchInput.value === null) {
        if (drugs.length > 0) {
            loadPrducts(drugs);
            return;
        }else {
            getDrugApi();
            return;
        }
        
    }
    searchProducts();
});
index.addEventListener('click', (e)=>{
    e.preventDefault();
    window.location.href='../index.html';
})
contact.addEventListener('click', (e)=>{
    e.preventDefault();
    window.location.href='../index.html#contact';
})

window.addEventListener('DOMContentLoaded', () => {
    let drugs=JSON.parse(localStorage.getItem('drugs')) || [];
    if(drugs.length>0){
      loadPrducts(drugs)
      fetctCategories();
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
        fetctCategories()
    } catch (error) {
        console.log(error)
    }

}

function loadPrducts(product_list){
    currentDrugs=product_list;
    console.log(product_list)
    const newProducts = product_list.map(({ title, price, image, description,category, id,quantity }) => {
      return `<div class="product-items">
          <img src="${image}" alt="Products">
            <h3>${title}</h3>
            <p>${description}</p>
            <h4>Category: ${category}</h4>
            <span>Price: $${price}</span>
            <P>In Stock: ${quantity}</P>
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

function fetctCategories() {
    let drugs = JSON.parse(localStorage.getItem('drugs')) || [];
    if (drugs.length === 0) {
        getDrugApi();
        return;
    }else{
        categories.innerHTML = `<option value="all">All Categories</option>`;
        categories.innerHTML += drugs
            .map((product) => `<option value="${product.category}">${product.category}</option>`)
            .filter((value, index, self) => self.indexOf(value) === index) // Remove duplicates
            .join("");
    }
}
function searchProducts() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const filteredDrugs = currentDrugs.filter(drug => 
        drug.title.toLowerCase().includes(searchTerm) || 
        drug.category.toLowerCase().includes(searchTerm)
    );
    loadPrducts(filteredDrugs);
}

function filterByCategory() {
    const selectedCategory = categories.value;
    let drugs = JSON.parse(localStorage.getItem('drugs')) || [];
    if (selectedCategory === "all") {
        if (drugs.length === 0) {
            getDrugApi();
            return;
        }
        loadPrducts(drugs);
        return;
    }
    const filteredDrugs = drugs.filter(drug => drug.category === selectedCategory);
    loadPrducts(filteredDrugs);
    categories.value = selectedCategory; // Keep the selected category in the dropdown
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
  

 