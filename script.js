/* ============================================
   VELOTECH — SHOPPING CART SYSTEM
   ============================================ */

// -------- CART STATE --------
let cart = JSON.parse(localStorage.getItem("velotech-cart")) || [];

function saveCart() {
  localStorage.setItem("velotech-cart", JSON.stringify(cart));
}

// -------- UI REFS --------
const cartDrawer  = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const cartItems   = document.getElementById("cartItems");
const cartTotal   = document.getElementById("cartTotal");
const cartCount   = document.getElementById("cartCount");
const cartIcon    = document.getElementById("cartIcon");
const cartClose   = document.getElementById("cartClose");
const cartClear   = document.getElementById("cartClear");
const cartCheckout= document.getElementById("cartCheckout");

// -------- OPEN / CLOSE --------
function openCart() {
  if (!cartDrawer) return;
  cartDrawer.classList.add("open");
  cartOverlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeCart() {
  if (!cartDrawer) return;
  cartDrawer.classList.remove("open");
  cartOverlay.classList.remove("open");
  document.body.style.overflow = "";
}

if (cartIcon)    cartIcon.addEventListener("click", openCart);
if (cartClose)   cartClose.addEventListener("click", closeCart);
if (cartOverlay) cartOverlay.addEventListener("click", closeCart);

// -------- ADD TO CART --------
function addToCart(name, price) {
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  saveCart();
  renderCart();
  openCart();
}

// -------- REMOVE / QTY --------
function removeItem(name) {
  cart = cart.filter(item => item.name !== name);
  saveCart();
  renderCart();
}

function changeQty(name, delta) {
  const item = cart.find(i => i.name === name);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeItem(name);
  } else {
    saveCart();
    renderCart();
  }
}

// -------- RENDER --------
function renderCart() {
  if (!cartItems) return;

  // Update count badge
  const totalQty = cart.reduce((sum, i) => sum + i.qty, 0);
  if (cartCount) cartCount.textContent = totalQty;

  // Empty state
  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="cart-empty">
        <p>Your cart is empty 😢</p>
        <p style="font-size:14px;margin-top:8px;color:var(--text-dim);">
          Add some phones to get started!
        </p>
      </div>
    `;
    if (cartTotal) cartTotal.textContent = "R0";
    return;
  }

  // Render items
  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <span class="cart-item-price">R${item.price.toLocaleString()}</span>
      </div>
      <div class="cart-item-controls">
        <button class="qty-btn" data-action="dec" data-name="${item.name}">−</button>
        <span class="qty">${item.qty}</span>
        <button class="qty-btn" data-action="inc" data-name="${item.name}">+</button>
        <button class="remove-btn" data-action="remove" data-name="${item.name}">🗑</button>
      </div>
    </div>
  `).join("");

  // Total
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  if (cartTotal) cartTotal.textContent = "R" + total.toLocaleString();

  // Attach control listeners
  cartItems.querySelectorAll("[data-action]").forEach(btn => {
    btn.addEventListener("click", () => {
      const { action, name } = btn.dataset;
      if (action === "inc")    changeQty(name, 1);
      if (action === "dec")    changeQty(name, -1);
      if (action === "remove") removeItem(name);
    });
  });
}

// -------- CLEAR CART --------
if (cartClear) {
  cartClear.addEventListener("click", () => {
    if (cart.length === 0) return;
    if (confirm("Clear your entire cart?")) {
      cart = [];
      saveCart();
      renderCart();
    }
  });
}

// -------- CHECKOUT (fake for now) --------
if (cartCheckout) {
  cartCheckout.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
         // Check if user is logged in
    const currentUser = JSON.parse(localStorage.getItem("velotech-current-user"));

    if (!currentUser) {
      // Send to login page, tell it to come back to checkout after
      window.location.href = "login.html?redirect=checkout";
    } else {
    window.location.href = "checkout.html";
  });
}

// ============================================
// ATTACH "ADD TO CART" TO ALL BUTTONS
// ============================================

function attachAddToCartButtons() {
  document.querySelectorAll(".add-cart").forEach(button => {
    // Avoid double-binding
    if (button.dataset.bound) return;
    button.dataset.bound = "true";

    button.addEventListener("click", () => {
      // Try to find a name + price
      const card = button.closest(".product") || button.closest(".detail-info");

      let name = button.dataset.name;
      let price = 0;

      if (card) {
        if (!name) {
          const h3 = card.querySelector("h3") || card.querySelector("h1");
          if (h3) name = h3.innerText.trim();
        }
        const priceEl = card.querySelector(".new-price");
        if (priceEl) {
          price = parseInt(priceEl.innerText.replace(/[^0-9]/g, ""), 10) || 0;
        }
      }

      if (!name) name = "Unknown Product";
      addToCart(name, price);

      // Button feedback
      const original = button.innerText;
      button.innerText = "✓ Added";
      button.classList.add("added");
      setTimeout(() => {
        button.innerText = original;
        button.classList.remove("added");
      }, 1200);
    });
  });
}

// ============================================
// NEWSLETTER (from before, kept)
// ============================================
const subscribeBtn = document.querySelector(".newsletter button");
if (subscribeBtn) {
  subscribeBtn.addEventListener("click", () => {
    const email = document.querySelector(".newsletter input").value;
    if (email) {
      alert("Thanks! " + email + " is subscribed. 🎉");
    } else {
      alert("Please enter your email first.");
    }
  });
}

// ============================================
// SCROLL REVEAL (from before, kept)
// ============================================
const revealEls = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => observer.observe(el));

// ============================================
// INIT
// ============================================
renderCart();
attachAddToCartButtons();

// Re-attach buttons after phones.js renders its grid
// (phones.js will also call attachAddToCartButtons)
window.attachAddToCartButtons = attachAddToCartButtons;
// -------- USER ICON --------
const userIcon = document.getElementById("userIcon");
if (userIcon) {
  const user = JSON.parse(localStorage.getItem("velotech-current-user"));

  if (user) {
    userIcon.title = "Logged in as " + user.name + " (click to log out)";
    userIcon.textContent = "👤✓";

    userIcon.addEventListener("click", () => {
      if (confirm("Log out of VeloTech?")) {
        localStorage.removeItem("velotech-current-user");
        location.reload();
      }
    });
  } else {
    userIcon.title = "Sign in";
    userIcon.addEventListener("click", () => {
      window.location.href = "login.html";
    });
  }
}
