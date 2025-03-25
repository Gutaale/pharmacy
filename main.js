const Signup = document.querySelector('#signup');
const SignIn = document.querySelector('#signin');
const card = document.querySelector('.card');
const cardBody = document.querySelector('.card-body');
const products = document.querySelector('.products');
const cart=document.querySelector('.cart');
const cartModel=document.querySelector('.cart-model');
const cartClose=document.querySelector('.close');
let cartItems = document.querySelector(".cart-items");
const adminDashboard=document.querySelector('.admin-dashboard'); //admin-dashboard
const adminName=document.querySelector('#adminName');
const inventory=document.querySelector('.inventory');
const form=document.getElementById('drug-registration');
const tableData=document.querySelector('#inventory-items');
const addNewDrug=document.querySelector('#add-new-drug');
const drugRegistrationModel=document.querySelector('.drug-registration-model')
const btnRegister=document.getElementById('register-drug').value.trim();
const drugRegistrationContent=document.querySelector('.drug-registration-content')

// getDrugApi();
getUsers();
countItemsInTheCart();
let currentDrugs = [];
let users=[];
let drugs=[];

window.addEventListener('DOMContentLoaded', () => {
  let drugs=JSON.parse(localStorage.getItem('drugs')) || [];
  if(drugs.length>0){
    loadPrducts(drugs)
  }else{  
  getDrugApi();
  }
});

SignIn.addEventListener('click', (e) => {
    e.preventDefault();
    if(SignIn.innerHTML=='Sign Out'){
        products.style.display='grid';
        adminDashboard.classList.remove('active');
        SignIn.innerHTML='Sign In'
        let drugs=JSON.parse(localStorage.getItem('drugs')) || [];
        if(drugs){  
          loadPrducts(drugs)      
        }else{
          getDrugApi();
        }
        return
    } 
    card.classList.add('active');
    handleSignIn();
});

Signup.addEventListener('click', (e) => {   
    e.preventDefault();
    card.classList.add('active');
    console.log('Sign up button clicked');
    handleSignup();
});


cart.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('Cart button clicked');
    cartModel.classList.add('active');
    renderCart();
});

cartClose.addEventListener('click', (e) => {   
    closeCart()
 });  

 form.addEventListener('submit', (e) => {  
    e.preventDefault();
    const message = document.getElementById('message-register');
    if(btnRegister.value=='Register Drug'){
      handleRegisterDrug(message); 
    }else{
      updateDrug(message)
    }


});
addNewDrug.addEventListener('click', (e) => {  
    e.preventDefault();   
    const drugRegistraionModel=document.querySelector('.drug-registration-model'); 
    const inventory=document.querySelector('.inventory');
    inventory.style.display='none';
    drugRegistraionModel.style.display='block';
  });

window.onclick=function(event){
    if(event.target==card){
        closeCard()
        return
    }
    if(event.target==cartModel){
        closeCart()
        return
    }

}



// Function to handle events



async function handleRegisterDrug(message) {
  // const message=document.getElementById('message');
  const title=document.getElementById('title').value.trim();
  const price=Number(document.getElementById('price').value.trim()); 
  const description=document.getElementById('description').value.trim();
  const image=document.getElementById('image').value.trim();
  const quantity=Number(document.getElementById('quantity').value.trim());
  message.style.color='red';
if(title=='' ||  title==null){
    message.textContent='Title is required'
    return
}
if(price=='' ||  price==null){  
    message.textContent='Price is required'
    return
}
if(description=='' ||  description==null){  
    message.textContent='Description is required'
    return
}
if(image=='' ||  image==null){
    message.textContent='Image is required'
    return
}
if(quantity=='' ||  quantity==null){
    message.textContent='Quantity is required'
    return
}

let drugs=JSON.parse(localStorage.getItem('drugs')) || [];
let drug=drugs.find(drug=>drug.title==title); 


if(drug){
    message.textContent='Drug already exists'      
    let newDrug={
        id:drugs.length+1,
        title:title,
        price:price,
        description:description,
        image:image,
        quantity:quantity
    }
    drugs.push(newDrug);
    localStorage.setItem('drugs',JSON.stringify(drugs));
    message.style.color='green'
    message.textContent='Successfully Registered'
    console.log('message',message)
    closeCard(); 
}

}



function handleSignup() {
    cardBody.innerHTML='';
    cardBody.innerHTML=`
                  
                    <form id="signup">
                      <h2>Sign Up</h2>
                     <p id="message"></p> 
                        <input type="text" name="first-name" id="first-name" placeholder="First name"required>
                        <input type="text" name="last-name" id="last-name" placeholder="Last name"required>
                        <input type="email" name="email" id="email" placeholder="Email "required>
                        <input type="password" name="password" id="password" placeholder="password"required>
                        <input type="password" name="confirm_password" id="confirm_password" placeholder="Confirm password"required>
                        <div class="buttons">
                            <button type="submit" class="btn btn-sign-up">Sign Up</button>
                        </div>
                    </form>
    `   
    const btnSignUp=document.querySelector('.btn-sign-up');
    btnSignUp.addEventListener('click', (e) => {    
        e.preventDefault();   
        const message=document.getElementById('message');
        processSignup(message);
    })

}

function processSignup(message){
  message.style.color='red'
  let firstName=document.getElementById('first-name').value;  
  let lastName=document.getElementById('last-name').value;
  let email=document.getElementById('email').value;
  let password=document.getElementById('password').value;
  let confirmPassword=document.getElementById('confirm_password').value;
  if(firstName=='' ||  firstName==null){
      message.textContent='First name is required'
      return
  }
  if(lastName=='' ||  lastName==null){
      message.textContent='Last name is required'
      return
  }
  if(email=='' ||  email==null){
      message.textContent='Email is required'
      return
  }
  if(password=='' ||  password==null){    
      message.textContent='Password is required'
      return
  }    
  if(confirmPassword=='' ||  confirmPassword==null){
      message.textContent='Confirm Password is required'
      return
  }
  if(password!=confirmPassword){
      message.textContent='Password does not match'
      return
  }
  let users=JSON.parse(localStorage.getItem('users')) || [];
  let user=users.find(user=>user.email==email);
  if(user){
      message.textContent='Email already exists'      
      return
  }
  let newUser={
      id:users.length+1,
      first_name:firstName,
      last_name:lastName,
      email:email,
      password:password,
      role:'user'
  }
  users.push(newUser);
  localStorage.setItem('users',JSON.stringify(users));
  message.style.color='green'
  message.textContent='Successfully Registered'
  closeCard(); 

}

function handleSignIn(){
    // card.classList.add('active')
    cardBody.innerHTML='';
    cardBody.innerHTML=`
     
                    <form id="login">
                    <h2>Login</h2>
                            <p id="message"></p>                            
                            <input type="text" name="username" id="username" placeholder="Enter email Username"required>
                            <input type="password" name="password" id="password" placeholder="password"required>
                            <div class="buttons">
                                <button type="submit" class="btn btn-sign-in">Sign In</button>
                            </div>
                    </form>      
    `

    const btnSignIn=document.querySelector('.btn-sign-in');
    btnSignIn.addEventListener('click', (e) => {
        e.preventDefault();   
        const message=document.getElementById('message');
        processSignIn(message);
  
      });
}


function processSignIn(message){
  message.style.color='red'
  let username=document.getElementById('username').value;
  let password=document.getElementById('password').value;
  if(username=='' ||  username==null){
      message.textContent='Username is required'
      return
  } 
  if(password=='' ||  password==null){
      message.textContent='Passqord is required'
      return
  }
  let users=JSON.parse(localStorage.getItem('users'));
  let user=users.find(user=>user.email==username && user.password==password);
  if(user){
      message.style.color='green'
      message.textContent='Login successful'
      if(user.role=='admin'){
        setTimeout(()=>{
          closeCard()
          products.style.display='none';
          adminDashboard.classList.add('active');
          inventory.classList.add('active');
          adminName.innerHTML=`${user.first_name} ${user.last_name}`
          loadDataIntoTheTable()
            
          SignIn.innerHTML='Sign Out'
        },1000)
      }
      
      setTimeout(()=>{
          closeCard()
          SignIn.innerHTML='Sign Out'
      },1000)


  }else{
      message.textContent='Invalid username or password!! Try again.'
  }
}
function loadDataIntoTheTable(){
  let drugs=JSON.parse(localStorage.getItem('drugs')) || [];
          const newDrug=drugs.map(({id,title,description,price,quantity})=>{
            return `]
              <tr>    
              <td>${id}</td>
              <td>${title}</td>
              <td>${description}</td>
              <td>${price}</td>
              <td>${quantity}</td>
              <td>
                <button class="btn"><i class="fa fa-edit" id="edit" data-id="${id}"></i></button>
                <button class="btn"><i class="fa fa-trash"id="delete" data-id="${id}"></i></button>
              </td>
            </tr>
            `
          }).join("")
          
            tableData.innerHTML=newDrug  
            tableData.querySelectorAll('.fa-edit').forEach((button)=>{
              button.addEventListener("click", (e) => {
                e.preventDefault();
                const { id } = button.dataset;
                console.log(id)
                let drug = drugs.find((drug) => drug.id == id);
                console.log(drug)
                // fillForm(drug,id);

                console.log(drugRegistrationModel)
                // tableData.style.display='none';
                inventory.classList.remove('active');
                drugRegistrationModel.classList.add('active')
                drugRegistrationContent.innerHTML=`
                <h2>Updat Drug</h2>
                <form id="drug-update">
                  <p id="message-register"></p>
                  <div class="form-group">
                  <input type="text" name="title" id="title" value="${drug.title}">
                  <input type="text" name="image" id="image" value="${drug.image}">
                  </div>
                  <textarea name="description" id="description">${drug.description}</textarea>
                  <div class="form-group">
                  <input type="text" name="price" id="price" value="${drug.price}" required>
                  <input type="text" name="quantity" id="quantity" value="${drug.quantity}" required>
                  </div>
                  <input type="submit" class="btn" id="update-drug" value="Update Drug">
                </form>
                `
                const btnUpdate=document.querySelector('#update-drug')
                const message=document.querySelector('#message')
                btnUpdate.addEventListener('click', (e)=>{
                  updateDrug(message, id)
                })
            })
          });

          tableData.querySelectorAll('.fa-trash').forEach((button)=>{
            button.addEventListener("click", (e) => {
              e.preventDefault();
              const { id } = button.dataset;
              handleDelete(id);
            })}
            );
}
function handleDelete(id){

  let drugs=JSON.parse(localStorage.getItem('drugs'))
  drugs = drugs.filter(drug=> drug.id !== Number(id)); 

  console.log("delete", drugs)
  // console.log("newDrugs",d)
  console.log(id)
  localStorage.setItem('drugs', JSON.stringify(drugs));
  alert("Successfully deleted!!")
  loadDataIntoTheTable();
}
function fillForm(drug){ 
  drugRegistrationModel.querySelector('h2').textContent='Edit Drug';
  // const btnUpdate=drugRegistrationModel.querySelector('#register-drug');
  const title=document.getElementById('title');
  const price=document.getElementById('price'); 
  const description=document.getElementById('description');
  const image=document.getElementById('image');
  const quantity=document.getElementById('quantity');

  // btnUpdate.value='Update Drug';
  title.value=drug.title;
  price.value=drug.price
  description.value=drug.description
  image.value=drug.image
  quantity.value=drug.quantity
}

function updateDrug(message, drugid){
  message.textContent="Updated Successfully"

  const title=document.getElementById('title').value.trim();
  const price=document.getElementById('price').value.trim(); 
  const description=document.getElementById('description').value.trim();
  const image=document.getElementById('image').value.trim();
  const quantity=document.getElementById('quantity').value.trim();
  
  const olddrugs=JSON.parse(localStorage.getItem('drugs')) || [];
  const drug=olddrugs.find((drug)=>drug.id==drugid);
  drug.title=title
  drug.price=Number(price)
  drug.description=description
  drug.image=image
  drug.quantity=Number(quantity)
  
  console.log(title.value)
  console.log('drugs',olddrugs)
  localStorage.setItem('drugs',JSON.stringify(olddrugs))
  loadDataIntoTheTable();
}


async function getUsers(){
  try{
    let response= await fetch('users.json');
    let data= await response.json();
    localStorage.setItem('users',JSON.stringify(data))
  }catch(error){
    console.log(error)
  }
}

function closeCard() {
    card.classList.remove('active');
}
function closeCart() {
    cartModel.classList.remove('active');
}

async function getDrugApi(){
    try {
        const response= await fetch("data.json");
        const data= await response.json()
        localStorage.setItem('drugs',JSON.stringify(data))
        // let drugs=JSON.parse(localStorage.getItem('drugs')) || [];
        loadPrducts(data)
        console.log(data)
    } catch (error) {
        console.log(error)
    }

}


function loadPrducts(product_list){
    currentDrugs=product_list;
    const newProducts = product_list.map(({ title, price, image, description, id }) => {
      return `<div class="product">
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
        countItemsInTheCart();
        renderCart();
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
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartCount.textContent = cart.length;
    calculateCartItems();
  }
  
  function calculateCartItems() {
    let cartTotal = document.querySelector("#cartTotal");
  
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = cart.reduce((acc, item) => acc + item.quantity * item.price, 0);
    cartTotal.textContent = total.toFixed(2);
  }