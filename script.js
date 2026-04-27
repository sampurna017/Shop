let products = [
 {id:1,name:"Shoes",price:2500,old:3000,cat:"clothes",img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff"},
 {id:2,name:"T-Shirt",price:1500,old:2000,cat:"clothes",img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"},
 {id:3,name:"Jacket",price:3500,old:4500,cat:"clothes",img:"https://images.unsplash.com/photo-1520975916090-3105956dac38"},
 {id:4,name:"Headphones",price:4000,old:5000,cat:"tech",img:"https://images.unsplash.com/photo-1518441902110-1c16b7b8b2c3"},
 {id:5,name:"Watch",price:5000,old:6500,cat:"tech",img:"https://images.unsplash.com/photo-1518546305927-5a555bb7020d"},
 {id:6,name:"Phone",price:20000,old:25000,cat:"tech",img:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"},
 {id:7,name:"Chair",price:3000,old:4000,cat:"home",img:"https://images.unsplash.com/photo-1503602642458-232111445657"},
 {id:8,name:"Table",price:7000,old:9000,cat:"home",img:"https://images.unsplash.com/photo-1493666438817-866a91353ca9"}
];

let cart=[];
let current=[...products];

/* LOAD */
function load(){
 let box=document.getElementById("products");
 box.innerHTML="";

 current.forEach(p=>{
  let dis=Math.round(((p.old-p.price)/p.old)*100);

  box.innerHTML+=`
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

/* ADD */
function add(id){
 let item=products.find(p=>p.id===id);
 let exist=cart.find(c=>c.id===id);

 if(exist){exist.qty++}
 else{cart.push({...item,qty:1})}

 update();
 showToast();
}

/* UPDATE */
function update(){
 let items=document.getElementById("items");
 items.innerHTML="";
 let total=0,count=0;

 cart.forEach(p=>{
  total+=p.price*p.qty;
  count+=p.qty;

  items.innerHTML+=`
  <div class="cart-item">
   <div>
    <strong>${p.name}</strong><br>
    Rs ${p.price} x ${p.qty}
   </div>
   <div class="cart-controls">
    <button onclick="decrease(${p.id})">-</button>
    <button onclick="increase(${p.id})">+</button>
    <button onclick="removeItem(${p.id})">X</button>
   </div>
  </div>`;
 });

 document.getElementById("total").innerText=total;
 document.getElementById("count").innerText=count;
}

function increase(id){cart.find(p=>p.id===id).qty++;update();}
function decrease(id){
 let i=cart.find(p=>p.id===id);
 i.qty--;
 if(i.qty<=0) cart=cart.filter(p=>p.id!==id);
 update();
}
function removeItem(id){cart=cart.filter(p=>p.id!==id);update();}

function toggleCart(){
 document.getElementById("cart").classList.toggle("active");
}

function search(v){
 current=products.filter(p=>p.name.toLowerCase().includes(v.toLowerCase()));
 load();
}

function filter(c){
 current=(c==="all")?products:products.filter(p=>p.cat===c);
 load();
}

function purchase(){
 if(cart.length===0) return alert("Cart empty!");
 alert("✅ Purchased successfully!");
 cart=[];
 update();
 toggleCart();
}

function showToast(){
 let t=document.getElementById("toast");
 t.classList.add("show");
 setTimeout(()=>t.classList.remove("show"),1500);
}

load();
