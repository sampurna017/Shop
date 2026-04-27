let products = [
 {id:1,name:"Shoes",price:2500,old:3000,cat:"clothes",img:"https://picsum.photos/200?1"},
 {id:2,name:"T-Shirt",price:1500,old:2000,cat:"clothes",img:"https://picsum.photos/200?2"},
 {id:3,name:"Jacket",price:3500,old:4500,cat:"clothes",img:"https://picsum.photos/200?3"},
 {id:4,name:"Headphones",price:4000,old:5000,cat:"tech",img:"https://picsum.photos/200?4"},
 {id:5,name:"Watch",price:5000,old:6500,cat:"tech",img:"https://picsum.photos/200?5"},
 {id:6,name:"Phone",price:20000,old:25000,cat:"tech",img:"https://picsum.photos/200?6"},
 {id:7,name:"Chair",price:3000,old:4000,cat:"home",img:"https://picsum.photos/200?7"},
 {id:8,name:"Table",price:7000,old:9000,cat:"home",img:"https://picsum.photos/200?8"}
];

let cart = [];
let current = [...products];

/* LOAD PRODUCTS */
function load(){
 let box = document.getElementById("products");
 box.innerHTML = "";

 current.forEach((p)=>{
  let dis = Math.round(((p.old - p.price)/p.old)*100);

  box.innerHTML += `
  <div class="card">
   <div class="badge">-${dis}%</div>
   <img src="${p.img}">
   <h4>${p.name}</h4>
   <div class="price">Rs ${p.price}</div>
   <div class="old">Rs ${p.old}</div>
   <button onclick="add(${p.id})">Add</button>
  </div>`;
 });
}

/* ADD ITEM */
function add(id){
 let item = products.find(p => p.id === id);
 let exist = cart.find(c => c.id === id);

 if(exist){
  exist.qty++;
 } else {
  cart.push({...item, qty:1});
 }

 update();
}

/* INCREASE */
function increase(id){
 let item = cart.find(p => p.id === id);
 if(item){
  item.qty++;
  update();
 }
}

/* DECREASE */
function decrease(id){
 let item = cart.find(p => p.id === id);
 if(item){
  item.qty--;
  if(item.qty <= 0){
   cart = cart.filter(p => p.id !== id);
  }
  update();
 }
}

/* REMOVE */
function removeItem(id){
 cart = cart.filter(p => p.id !== id);
 update();
}

/* UPDATE CART UI */
function update(){
 let items = document.getElementById("items");
 items.innerHTML = "";

 let total = 0;
 let count = 0;

 cart.forEach(p=>{
  total += p.price * p.qty;
  count += p.qty;

  items.innerHTML += `
    <div class="cart-item">
      <div class="cart-info">
        <strong>${p.name}</strong><br>
        Rs ${p.price} x ${p.qty}
      </div>

      <div class="cart-controls">
        <button onclick="decrease(${p.id})">-</button>
        <button onclick="increase(${p.id})">+</button>
        <button onclick="removeItem(${p.id})" style="background:red;color:white;">X</button>
      </div>
    </div>
  `;
 });

 document.getElementById("total").innerText = total;
 document.getElementById("count").innerText = count;
}

/* TOGGLE CART */
function toggleCart(){
 document.getElementById("cart").classList.toggle("active");
}

/* SEARCH */
function search(v){
 current = products.filter(p =>
  p.name.toLowerCase().includes(v.toLowerCase())
 );
 load();
}

/* FILTER */
function filter(c){
 current = (c==="all") ? products : products.filter(p => p.cat === c);
 load();
}

/* PURCHASE */
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
