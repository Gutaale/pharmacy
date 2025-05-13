const header = document.querySelector("#header");
const cartCount = document.querySelector("#cartCount");


getHeader();
const humberger =document.querySelector('.humberger')
const navbar=document.querySelector('.navbar')
countItemsInTheCart()

humberger.addEventListener('click', ()=>{
    humberger.classList.toggle('active');
    navbar.classList.toggle('active')

})

//funtion to get the header
function getHeader(){
    header.innerHTML = `
            <div class="container">
                <div class="logo">
                <img src="../assets/images/logo.png" alt="logo">
                    <h1>Pharmacy</h1>
                </div>
                <div class="humberger">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            <ul class="navbar">
                <li><a href="index.html">Home</a></li>
                <li><a href="index.html#about">About</a> </li>
                <li><a href="index.html#contact">Contact</a> </li>
                <li><a href="../html/products.html">Products</a> </li>
                <li><a href="../html/auth.html" id="signin-link" class="btn">logIn</a></li>
                <li ><a class="cart" href="../html/shoppingCart.html">
                    <i class="fa fa-shopping-cart"></i>
                    <span id="cartCount">0</span>
                </a>
                </li>
            </ul>
        </div>
    `
}

function countItemsInTheCart() {
    let cartCount = document.querySelector("#cartCount");
    console.log(cartCount);
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartCount.textContent = cart.length;
  }

