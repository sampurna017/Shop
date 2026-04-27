let products = [
 {name:"Shoes",price:2500,old:3000,cat:"clothes",img:"https://picsum.photos/200?1"},
 {name:"T-Shirt",price:1500,old:2000,cat:"clothes",img:"https://picsum.photos/200?2"},
 {name:"Headphones",price:4000,old:5000,cat:"tech",img:"https://picsum.photos/200?3"},
 {name:"Watch",price:5000,old:6500,cat:"tech",img:"https://picsum.photos/200?4"}
];

let cart = [];
let current = [...products];

function load(){
 let box = document.getElementById("products");
 box.innerHTML = "";

 current.forEach((p,i)=>{
  let dis = Math.round(((p.old-p.price)/p.old)*100);

  box.innerHTML += `
  <div class="card">
   <div class="badge">-${dis}%</div>
   <img src="${p.img}">
   <h4>${p.name}</h4>
   <div class="price">Rs ${p.price}</div>
   <div class="old">Rs ${p.old}</div>
   <button onclick="add(${i})">Add</button>
  </div>`;
 });
}

function add(i){
 cart.push(current[i]);
 update();
}

function update(){
 let items = document.getElementById("items");
 items.innerHTML = "";
 let total = 0;

 cart.forEach(p=>{
  total += p.price;
  items.innerHTML += `<p>${p.name} - Rs ${p.price}</p>`;
 });

 document.getElementById("total").innerText = total;
 document.getElementById("count").innerText = cart.length;
}

function toggleCart(){
 document.getElementById("cart").classList.toggle("active");
}

function search(v){
 current = products.filter(p =>
  p.name.toLowerCase().includes(v.toLowerCase())
 );
 load();
}

function filter(c){
 current = (c==="all") ? products : products.filter(p => p.cat===c);
 load();
}

function purchase(){
 if(cart.length === 0){
  alert("Cart is empty!");
  return;
 }
 alert("✅ Successfully Purchased!\nThank you!");
 cart = [];
 update();
 toggleCart();
}

load();
