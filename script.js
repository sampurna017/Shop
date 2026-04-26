let products = [
  {name:"Shoes", price:20, cat:"clothes", img:"https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg"},
  {name:"T-Shirt", price:15, cat:"clothes", img:"https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg"},
  {name:"Watch", price:50, cat:"tech", img:"https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg"}
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let current = [...products];

function load(){
  let box = document.getElementById("products");
  box.innerHTML = "";
  current.forEach((p,i)=>{
    box.innerHTML += `
      <div class="card" onclick="openModal(${i})">
        <img src="${p.img}">
        <h3>${p.name}</h3>
        <p>$${p.price}</p>
      </div>
    `;
  });
}

function openModal(i){
  let p = current[i];
  document.getElementById("modal").style.display = "flex";
  document.getElementById("modalBox").innerHTML = `
    <img src="${p.img}" width="100%">
    <h3>${p.name}</h3>
    <p>$${p.price}</p>
    <button onclick="addItem('${p.name}', ${p.price})">Add</button>
  `;
}

function addItem(name, price){
  let item = cart.find(x => x.name === name);
  if(item){ item.qty++; }
  else { cart.push({name, price, qty:1}); }
  save();
  document.getElementById("modal").style.display = "none";
}

function save(){
  localStorage.setItem("cart", JSON.stringify(cart));
  update();
}

function update(){
  let items = document.getElementById("items");
  items.innerHTML = "";
  let total = 0, count = 0;

  cart.forEach((item,i)=>{
    total += item.price * item.qty;
    count += item.qty;

    items.innerHTML += `
      <div>
        ${item.name} x${item.qty}
        <button onclick="removeItem(${i})">X</button>
      </div>
    `;
  });

  document.getElementById("total").innerText = total;
  document.getElementById("count").innerText = count;
}

function removeItem(i){
  cart.splice(i,1);
  save();
}

function toggleCart(){
  document.getElementById("cart").classList.toggle("active");
}

function search(val){
  current = products.filter(p =>
    p.name.toLowerCase().includes(val.toLowerCase())
  );
  load();
}

function filterCat(cat){
  current = (cat === "all") ? [...products] : products.filter(p => p.cat === cat);
  load();
}

function sortProducts(type){
  if(type === "low") current.sort((a,b)=>a.price-b.price);
  if(type === "high") current.sort((a,b)=>b.price-a.price);
  load();
}

function checkout(){
  alert("Checkout page (UI only)");
}

function placeOrder(){
  alert("Order placed!");
  cart = [];
  save();
}

function toggleTheme(){
  document.body.classList.toggle("dark");
}

load();
update();