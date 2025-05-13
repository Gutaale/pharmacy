const adminDashboard=document.querySelector('.admin-dashboard'); //admin-dashboard
const adminName=document.querySelector('#adminName');
const form=document.querySelector('.form');
const tableData=document.querySelector('#inventory-items');
const addNewDrug=document.querySelector('#add-new-drug');
const drugRegistrationModel=document.querySelector('.drug-registration-model')
const btnRegister=document.getElementById('register-drug');
const drugRegistrationContent=document.querySelector('.drug-registration-content')
const dashboard =document.querySelector('.dashboard');
const inventory=document.querySelector('.inventory');
const customers=document.querySelector('.customers');

const title=document.getElementById('title')
const price=document.getElementById('price')
const category=document.getElementById('category')
const description=document.getElementById('description')
const image=document.getElementById('image')
const quantity=document.getElementById('quantity')
// descktop view
const adminDashboardLink=document.querySelector('#dashboard');
const adminInventoryLink=document.querySelector('#inventory');
const adminCustomerLink=document.querySelector('#customers');
// Mobile view
const dashboardLink=document.querySelector('#dashboard-link');
const inventoryLink=document.querySelector('#inventory-link');
const customerLink=document.querySelector('#customers-link');
const settingsLink=document.querySelector('#settings-link');
const customersList=document.querySelector('#customers-list');
const ModelClose=document.querySelector('#closeModel');
const message = document.querySelector('.message-register');
const humburger=document.querySelector('.humberger');
const menuLinks=document.querySelectorAll('.menu-links');

const logOut=document.querySelector('#log-out');
const leftSide =document.querySelector('.left-side')

dashboard.classList.add('active');

    let user=JSON.parse(localStorage.getItem('onlineUser')) || [];
    if(!user){
        window.location.href='index.html';
    }else{
      adminName.textContent= user.first_name;
      console.log(user)
    }
      
    humburger.addEventListener('click', (e) => {
        e.preventDefault();
        humburger.classList.toggle('active')
        menuLinks.forEach((menu)=>{
          menu.classList.toggle('active')
        })
        leftSide.classList.toggle('active')
    });



// dashboardLink.addEventListener('click', (e) => {
//     e.preventDefault();
//     dashboard.classList.add('active');
//     inventory.classList.remove('active');
//     customers.classList.remove('active');
//     drugRegistrationModel.classList.remove('active');

//     // customer.classList.remove('active');
//     // settings.classList.remove('active');
// });
adminDashboardLink.addEventListener('click', (e) => {
    e.preventDefault();
    dashboard.classList.add('active');
    inventory.classList.remove('active');
    customers.classList.remove('active');
    drugRegistrationModel.classList.remove('active');
})

logOut.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('onlineUser');
    window.location.href='../index.html';
});
// inventoryLink.addEventListener('click', (e) => {
//     e.preventDefault();
//     dashboard.classList.remove('active');
//     inventory.classList.add('active');
//     customers.classList.remove('active');
//     drugRegistrationModel.classList.remove('active');

//     // customer.classList.remove('active');
//     // settings.classList.remove('active');
// });
adminInventoryLink.addEventListener('click', (e) => {
    e.preventDefault();
    dashboard.classList.remove('active');
    inventory.classList.add('active');
    customers.classList.remove('active');
    drugRegistrationModel.classList.remove('active'); 
    loadDataIntoTheTable();
});
adminCustomerLink.addEventListener('click', (e) => {
    e.preventDefault();  
    dashboard.classList.remove('active');
    inventory.classList.remove('active');
    customers.classList.add('active');
    loadUsersIntoTheTable();
});

// customerLink.addEventListener('click', (e) => {
//     e.preventDefault();  
//     dashboard.classList.remove('active');
//     inventory.classList.remove('active');
//     customers.classList.add('active');
//     loadUsersIntoTheTable();
// });


addNewDrug.addEventListener('click', (e) => {  
  e.preventDefault();   
  // const inventory=document.querySelector('.inventory');
  inventory.classList.remove('active');
  // drugRegistrationModel.classList.remove('active');
  clearForm();
  drugRegistrationModel.classList.add('active');
});

document.body.addEventListener('click', (e) => {  
  e.preventDefault();
  if(e.target.id==='register-drug'){
    handleRegisterDrug(message); 

  }else if(e.target.id==='update-drug'){
    updateDrug(message);  
    localStorage.removeItem('updatingDrug');
  }
  });

  ModelClose.addEventListener('click', (e) => {   
    closeModel()
 });
// functions goes here
function loadUsersIntoTheTable(){
    const users=JSON.parse(localStorage.getItem('users')) || []
      const userData=users.map(user=>{
                       return `
                                  <tr>
                                    <td>${user.id}</td>
                                    <td>${user.first_name}</td>
                                    <td>${user.last_name}</td>
                                    <td>${user.email}</td>
                                    <td>${user.role}</td>  
                                  </tr>        
                         `
      }).join('');
      customersList.innerHTML=userData;
  }
  function closeModel(){
      drugRegistrationModel.classList.remove('active');
      
      inventory.classList.add('active');
  }
  async function handleRegisterDrug(message) {
    // const message=document.getElementById('message');
    const ItemTitle=title.value.trim();
    const ItemPrice=Number(price.value.trim()); 
    const ItemCategory=category.value.trim();
    const ItemDescription=description.value.trim();
    const ItemImage=image.value.trim();
    const ItemQuantity=Number(quantity.value.trim());
    message.style.color='red';
  if(ItemTitle=='' ||  ItemTitle==null){
      message.textContent='Title is required'
      return
  }
  if(ItemPrice=='' ||  ItemPrice==null){  
      message.textContent='Price is required'
      return
  }
  if(ItemCategory=='' ||  ItemCategory==null){
      message.textContent='Category is required'
      return;
  }
  if(ItemDescription=='' ||  ItemDescription==null){  
      message.textContent='Description is required'
      return
  }
  if(ItemImage=='' ||  ItemImage==null){
      message.textContent='Image is required'
      return
  }
  if(ItemQuantity=='' ||  ItemQuantity==null){
      message.textContent='Quantity is required'
      return
  }
  
  let drugs=JSON.parse(localStorage.getItem('drugs')) || [];
  let drug=drugs.find(drug=>drug.title==title); 
  
  
  if(!drug){
      let newDrug={
          id:drugs.length+1,
          title:ItemTitle,
          category:ItemCategory,
          price:ItemPrice,
          description:ItemDescription,
          image:ItemImage,
          quantity:ItemQuantity
      }
      drugs.push(newDrug);
      localStorage.setItem('drugs',JSON.stringify(drugs));
      message.style.color='green'
      message.textContent='Successfully Registered'
      console.log('message',message)
      setTimeout(() => {
        closeModel()
        loadDataIntoTheTable()
      }, 2000);
      
  }else{
    message.textContent='Drug already exists'      
  }
  
  }


  function loadDataIntoTheTable(){
    let drugs=JSON.parse(localStorage.getItem('drugs')) || [];
            const newDrug=drugs.map(({id,title,category,price,quantity})=>{
              return `
                <tr>    
                <td>${id}</td>
                <td>${title}</td>
                <td>${category}</td>
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
                localStorage.setItem('updatingDrug', JSON.stringify(drug));
                  console.log('drug',drug)
                  console.log(drug)
                  // fillForm(drug,id);
  
                  console.log(drugRegistrationModel)
                  // tableData.style.display='none';
                  inventory.classList.remove('active');
                  drugRegistrationModel.classList.add('active')
                  const formTitle=document.querySelector('#form-title');

                  formTitle.textContent='Update Drug'
                  title.value=drug.title;
                  category.value=drug.category;
                  price.value=drug.price; 
                  description.value=drug.description;
                  image.value=drug.image;
                  quantity.value=drug.quantity;
                  btnRegister.value='Update Drug';
                  btnRegister.id='update-drug';
                    // clearForm();
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
    let drug=drugs.find((drug)=> drug.id==id)
    let choice = confirm(`Sure to delete (${drug.title})`)
    if(choice){
      drugs = drugs.filter(drug=> drug.id !== Number(id)); 
      localStorage.setItem('drugs', JSON.stringify(drugs));
    }
    loadDataIntoTheTable();
  }
  function clearForm(){ 
    drugRegistrationModel.querySelector('h2').textContent='Drug Registration';
    const button=drugRegistrationModel.querySelector('.btn'); 
  
    button.value='Register Drug';
    button.id='register-drug';
    title.value='';
    title.placeholder='Enter Drug Title'
    price.value=''
    price.placeholder="Enter Price"
    category.value=''
    category.placeholder="Enter Category"
    description.value=''
    description.placeholder="Enter Description"
    image.value=''
    image.placeholder="Enter image address"
    quantity.value=''
    quantity.placeholder="Enter quantity"
    message.textContent=''
    message.style.color='red'
  }
  
  function updateDrug(message){

    let updateDrug=JSON.parse(localStorage.getItem('updatingDrug'));
    message.textContent="Updated Successfully"
  
    const ItemTitle=title.value.trim();
    const ItemPrice=Number(price.value.trim()); 
    const ItemCategory=category.value.trim();
    const ItemDescription=description.value.trim();
    const ItemImage=image.value.trim();
    const ItemQuantity=Number(quantity.value.trim());
    
    message.style.color='red';
  if(ItemTitle=='' ||  ItemTitle==null){
      message.textContent='Title is required'
      return
  }
  if(ItemPrice=='' ||  ItemPrice==null){  
      message.textContent='Price is required'
      return
  }
  if(ItemCategory=='' ||  ItemCategory==null){
      message.textContent='Category is required'
      return;
  }
  if(ItemDescription=='' ||  ItemDescription==null){  
      message.textContent='Description is required'
      return
  }
  if(ItemImage=='' ||  ItemImage==null){
      message.textContent='Image is required'
      return
  }
  if(ItemQuantity=='' ||  ItemQuantity==null){
      message.textContent='Quantity is required'
      return
  }



    const olddrugs=JSON.parse(localStorage.getItem('drugs')) || [];
    const drug=olddrugs.find((drug)=>drug.id==updateDrug.id);

    drug.title=ItemTitle
    drug.category=ItemCategory
    drug.price=Number(ItemPrice)
    drug.description=ItemDescription
    drug.image=ItemImage
    drug.quantity=Number(ItemQuantity)
    
    console.log(title.value)
    console.log('drugs',olddrugs)
    localStorage.setItem('drugs',JSON.stringify(olddrugs))
    setTimeout(() => {
      inventory.classList.add('active');
    drugRegistrationModel.classList.remove('active')
    loadDataIntoTheTable();
      
    }, 2000);
     message.style.color='green'
      message.textContent='Successfully Updated'
  }
  
  