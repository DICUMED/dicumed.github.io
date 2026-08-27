const cartKey='dicumed_cart_v7';
function getCart(){try{return JSON.parse(localStorage.getItem(cartKey)||'[]')}catch(e){return[]}}
function saveCart(c){localStorage.setItem(cartKey,JSON.stringify(c));updateCartCount()}
function addToCart(id){
  const p=window.DICUMED_PRODUCTS.find(x=>x.id===id); if(!p)return;
  let c=getCart(); let item=c.find(x=>x.id===id);
  if(item)item.qty++; else c.push({id:p.id,name:p.name,category:p.category,qty:1});
  saveCart(c);
  const b=document.querySelector(`[data-add="${id}"]`);
  if(b){const old=b.innerHTML;b.innerHTML='<i class="fa-solid fa-check"></i> Added';setTimeout(()=>b.innerHTML=old,900)}
}
function updateCartCount(){const n=getCart().reduce((s,x)=>s+x.qty,0);document.querySelectorAll('.cartCount').forEach(e=>e.textContent=n)}
function renderCart(){
  const root=document.getElementById('cartItems'); if(!root)return;
  const c=getCart();
  if(!c.length){root.innerHTML='<div class="empty"><i class="fa-solid fa-cart-shopping"></i><h3>Your cart is empty</h3><p>Browse the catalogue and add products you would like DICUMED to quote.</p></div>';return}
  root.innerHTML=c.map((x,i)=>`<div class="cartRow"><div><strong>${x.name}</strong><br><small>${x.category}</small></div><div class="qty"><button onclick="changeQty(${i},-1)">−</button><strong>${x.qty}</strong><button onclick="changeQty(${i},1)">+</button></div></div>`).join('');
}
function changeQty(i,d){let c=getCart();c[i].qty+=d;if(c[i].qty<=0)c.splice(i,1);saveCart(c);renderCart()}
function emailQuote(){
  const c=getCart(); if(!c.length){alert('Please add at least one product to your cart first.');return}
  const lines=c.map(x=>`- ${x.name} (${x.category}) x ${x.qty}`).join('\n');
  const subject=encodeURIComponent('DICUMED quotation request');
  const body=encodeURIComponent(`Hello DICUMED,\n\nPlease provide a quotation for the products in my cart:\n\n${lines}\n\nCompany / organisation:\nContact name:\nDelivery postcode:\nAdditional notes:\n\nKind regards,`);
  location.href=`mailto:info@dicumed.co.uk?subject=${subject}&body=${body}`;
}
function mobileMenu(){const n=document.getElementById('mobileNav');if(n)n.classList.toggle('open')}
function productCard(p){
 return `<article class="productCard">
   <a class="productImage" href="product.html?id=${encodeURIComponent(p.id)}"><img src="${p.img}" alt="${p.name}"></a>
   <div class="productBody">
     <span class="tag">${p.category}</span>
     <h3><a href="product.html?id=${encodeURIComponent(p.id)}">${p.name}</a></h3>
     <p>${p.desc}</p>
     <div class="productActions">
       <a class="btn small outline" href="product.html?id=${encodeURIComponent(p.id)}"><i class="fa-regular fa-eye"></i> View</a>
       <button class="btn small primary" data-add="${p.id}" onclick="addToCart('${p.id}')"><i class="fa-solid fa-cart-plus"></i> Add to Cart</button>
     </div>
   </div>
 </article>`;
}
document.addEventListener('DOMContentLoaded',()=>{updateCartCount();renderCart()});