let activeCategory='All';
function renderProducts(category='All'){
  activeCategory=category;
  const root=document.getElementById('productGrid'); if(!root)return;
  const q=(document.getElementById('search')?.value||'').toLowerCase();
  let ps=window.DICUMED_PRODUCTS.filter(p=>(category==='All'||p.category===category)&&(p.name+' '+p.category+' '+p.desc).toLowerCase().includes(q));
  root.innerHTML=ps.length?ps.map(productCard).join(''):'<div class="empty">No products match your search.</div>';
}
function setCategory(cat,el){
 document.querySelectorAll('.filterBtn').forEach(b=>b.classList.remove('active')); el.classList.add('active'); renderProducts(cat);
}
document.addEventListener('DOMContentLoaded',()=>renderProducts('All'));