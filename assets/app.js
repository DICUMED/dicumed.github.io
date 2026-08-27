
const PRODUCTS = window.DICUMED_PRODUCTS || [];
const PRODUCT_MAP = Object.fromEntries(PRODUCTS.map(p => [p.ref, p]));
const CAT_COLORS = {"Serum":"#d84f4f","Serum Gel":"#d7ae2f","Thrombin":"#df9c39","EDTA":"#8d5ab7","Heparin":"#4da36a","Trace Element":"#587a98","ACD":"#b66e82","Mini":"#e0b733","Needles":"#4d8bd1","Butterfly":"#28a6a6"};
let basket = JSON.parse(localStorage.getItem('dicumedBasket') || '{}');


function slugForCategory(cat){return ({'Serum':'serum','Serum Gel':'serum-gel','Thrombin':'serum-gel','EDTA':'edta','Heparin':'heparin','Trace Element':'trace-element','ACD':'acd','Mini':'mini','Needles':'needles','Butterfly':'butterfly'})[cat]||'serum'}
function imageForProduct(p){return `assets/images/${slugForCategory(p.category)}.svg`}

function basketCount(){return Object.values(basket).reduce((a,b)=>a+b,0)}
function saveBasket(){localStorage.setItem('dicumedBasket',JSON.stringify(basket));updateCartBadge();renderBasket()}
function updateCartBadge(){document.querySelectorAll('.cartCount').forEach(el=>el.textContent=basketCount())}
function addToBasket(ref){basket[ref]=(basket[ref]||0)+1;saveBasket();openCart()}
function changeQty(ref,d){basket[ref]=(basket[ref]||0)+d;if(basket[ref]<=0)delete basket[ref];saveBasket()}
function removeFromBasket(ref){delete basket[ref];saveBasket()}
function clearBasket(){basket={};saveBasket()}
function openCart(){document.getElementById('drawer')?.classList.add('open');document.getElementById('overlay')?.classList.add('show')}
function closeCart(){document.getElementById('drawer')?.classList.remove('open');document.getElementById('overlay')?.classList.remove('show')}
function renderBasket(){
 const body=document.getElementById('basketBody'); if(!body)return;
 const refs=Object.keys(basket);
 if(!refs.length){body.innerHTML='<div class="empty"><i class="fa-solid fa-basket-shopping" style="font-size:1.4rem;color:#7d92a6;margin-bottom:8px"></i><div>Your basket is empty.</div><div style="font-size:.86rem;margin-top:6px">Add products from the catalogue, then request a quote.</div></div>';return}
 body.innerHTML=refs.map(ref=>{const p=PRODUCT_MAP[ref];return `<div class="basketItem"><h4>${p.publicName || p.publicName || p.name}</h4><div class="muted">Ref: <strong>${p.ref}</strong> · ${p.category}</div><div class="muted">Pack/Carton: ${p.pack}</div><div class="qtyRow"><div class="qtyCtrls"><button onclick="changeQty('${p.ref}',-1)">−</button><strong>${basket[ref]}</strong><button onclick="changeQty('${p.ref}',1)">+</button></div><button class="btn outline small" onclick="removeFromBasket('${p.ref}')">Remove</button></div></div>`}).join('')
}
function goCheckout(){if(!basketCount()){openCart();return}location.href='checkout.html'}
function toggleMenu(){
 const nav=document.getElementById('desktopNav'); if(!nav)return;
 if(nav.dataset.open==='1'){nav.style.display='none';nav.dataset.open='0'}
 else{nav.style.display='flex';nav.style.flexDirection='column';nav.style.position='absolute';nav.style.top='86px';nav.style.left='4%';nav.style.right='4%';nav.style.padding='18px';nav.style.background='#fff';nav.style.border='1px solid #dfe6ee';nav.style.borderRadius='16px';nav.style.boxShadow='0 14px 30px rgba(15,39,66,.12)';nav.dataset.open='1'}
}
window.addEventListener('resize',()=>{const nav=document.getElementById('desktopNav');if(nav&&innerWidth>980){nav.removeAttribute('style');nav.dataset.open='0'}});
function mailQuote(subject,body){location.href=`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`}
function basketLines(){return Object.keys(basket).map(ref=>`${basket[ref]} x ${PRODUCT_MAP[ref].publicName || PRODUCT_MAP[ref].name} (Ref ${ref})`).join('\n')}
document.addEventListener('DOMContentLoaded',()=>{updateCartBadge();renderBasket()});
