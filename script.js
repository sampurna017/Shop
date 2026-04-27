let products = [
 {name:"Shoes",price:2500,old:3000,cat:"clothes",img:"https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg"},
 {name:"T-Shirt",price:1500,old:2000,cat:"clothes",img:"https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg"},
 {name:"Headphones",price:4000,old:5000,cat:"tech",img:"https://images.pexels.com/photos/3394665/pexels-photo-3394665.jpeg"},
 {name:"Watch",price:5000,old:6500,cat:"tech",img:"https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg"},
 {name:"Chair",price:3500,old:4200,cat:"home",img:"https://images.pexels.com/photos/2762247/pexels-photo-2762247.jpeg"}
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
   <div class="tag">Free Delivery</div>
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

load();
