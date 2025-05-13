const registerUserText=document.querySelector('#switch-form')
const loginCard=document.querySelector('.login-card');
const firstName=document.querySelector('#firstName')
const lastName=document.querySelector('#lastName')
const confirmPassword=document.querySelector('#confirmPassword')
const email=document.querySelector('#email')
const password=document.querySelector('#password')

const newUserText=document.querySelector('.new-user')
const formTitle=document.querySelector('#form-title')
const logInButton=document.querySelector('#logIn')

const loginForm=document.querySelector('#login-form');
const message =document.querySelector('#message')
// const logIn=document.querySelector('#logIn')


// console.log(loginForm)
let users=[];
window.addEventListener('DOMContentLoaded', (e)=>{
    users=JSON.parse(localStorage.getItem('users')) || []
    if(users.length>0){
    }else{
        getUsers();
    }
})

let singIn=true
document.body.addEventListener('click', (e)=>{
    e.preventDefault();
    if(e.target.id!=='switch-form')
        return
    switchAuthForm()
});


window.onclick=function(event){
    if(event.target==loginCard){
        closeCart()
        return
    }
  
  }

logInButton.addEventListener('click', (e)=>{
    e.preventDefault()
       
        if(singIn){
        processSingIn();
        }else{
            registerUser()
        }
})

// function 

function closeCart() {
    loginCard.classList.add('active');
    window.location.href="index.html"
}
async function getUsers(){
    try{
      let response= await fetch('../html/users.json');
      let data= await response.json();
      localStorage.setItem('users',JSON.stringify(data))
    }catch(error){
      console.log(error)
    }
  }

  function switchAuthForm(){
    singIn=!singIn
    if(!singIn){
        newUserText.innerHTML=`
        Already exist? <a href="#" id="switch-form">Sign In</a>
        `
        registerUserText.textContent="Sign In"
        formTitle.textContent="Sign Up"
        firstName.style.display="block"
        lastName.style.display="block"
        confirmPassword.style.display="block"
        logInButton.value="Sign Up"
        message.textContent=''
    }else{
        newUserText.innerHTML=`
        New User? <a href="#" id="switch-form">Sign Up</a>
        `
        registerUserText.textContent="Register Now"
        formTitle.textContent="Sign In"
        firstName.value=""
        firstName.style.display="none"
        lastName.value=""
        lastName.style.display="none"
        confirmPassword.value=""
        confirmPassword.style.display="none"
        logInButton.value="Sign In"
        email.value=''
        password.value=''
        message.textContent=''
    }
        
  }

  
  function processSingIn(){
    message.style.color="red";
    if(email.value==='' || email.value===null){
        message.textContent="Email is required"
        return
    }
    if(password.value==='' || password.value===null){
        message.textContent="Password is required"
        return
    }

    let users=JSON.parse(localStorage.getItem('users')) || []
    let user=users.find(user=>user.email===email.value && user.password===password.value)
    if(user){
        message.style.color='green'
        message.textContent='Login successful'
        localStorage.setItem('onlineUser', JSON.stringify(user))
        if(user.role==='Customer'){
            window.location.href='../html/products.html';
        }else{
            window.location.href="../html/dashboard.html"
        }
    }else{
        message.textContent="Invalid email or password!! Try again."

    }
  }

// function registerUser(user){
//     const Fname=firstName.value.trim()
//     const Lname=lastName.value.trim()
//     const ConfirmPassword=confirmPassword.value.trim()
//     const Email=email.value.trim();
//     const Password=password.value.trim();
//         registerUserIntoLocalStorage(Fname,Lname,Email,Password,ConfirmPassword,message);
// }


function registerUser(){
    message.style.color="red";
    if(firstName.value==='' || firstName.value===null){
        message.textContent="First Name is Required!"
        console.log(message)
        return
    }
    if(lastName.value==='' || lastName.value===null){
        message.textContent="Last Name is Required!"
        console.log("message",message)
        return
    }
    if(email.value==='' || email.value===null){
        message.textContent="Email is Required!"
        console.log(message)
        return
    }
    if(password.value==='' || password.value===null){
        message.textContent="Password is Required!"
        console.log(message)
        return
    }
    if(password.value!==confirmPassword.value){
        message.textContent="Password must Match!"
        console.log(message)
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
        first_name:singIn? undefined :firstName.value.trim(),
        last_name:singIn? undefined :lastName.value.trim(),
        email:email.value.trim(),
        password:password.value.trim(),
        role:'Customer'
    } 
    users.push(newUser);
    localStorage.setItem('users',JSON.stringify(users));
    message.style.color='green'
    message.textContent='Successfully Registered'
    setTimeout(()=>{
        switchAuthForm();
    }, 1000)
    
}