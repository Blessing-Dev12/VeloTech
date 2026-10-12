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

/* ============================================
   TABS + ACCORDION
   ============================================ */

// -------- TAB SWITCHING --------
document.querySelectorAll(".tab-pill").forEach(pill => {
  pill.addEventListener("click", () => {
    // Deactivate all pills + panels
    document.querySelectorAll(".tab-pill").forEach(p => p.classList.remove("active"));
    document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));

    // Activate clicked
    pill.classList.add("active");
    document.getElementById(pill.dataset.target).classList.add("active");
  });
});

// -------- ACCORDION --------
document.querySelectorAll(".accordion-header").forEach(header => {
  header.addEventListener("click", () => {
    const item = header.parentElement;
    const wasOpen = item.classList.contains("open");

    // Close all others in the same accordion
    item.parentElement.querySelectorAll(".accordion-item").forEach(i => {
      i.classList.remove("open");
    });

    // Toggle this one
    if (!wasOpen) item.classList.add("open");
  });
});
/* ============================================
   VELOTECH AI ASSISTANT — EVA
   ============================================ */

const evaFab     = document.getElementById("evaFab");
const evaPanel   = document.getElementById("evaPanel");
const evaClose   = document.getElementById("evaClose");
const evaReset   = document.getElementById("evaReset");
const evaMessages= document.getElementById("evaMessages");
const evaInput   = document.getElementById("evaInput");
const evaSend    = document.getElementById("evaSend");

// Only run if the bot exists on this page
if (evaFab && evaPanel) {

  // -------- OPEN / CLOSE --------
  evaFab.addEventListener("click", () => {
    evaPanel.classList.toggle("open");
    if (evaPanel.classList.contains("open")) {
      // Show welcome on first open
      if (!evaMessages.dataset.initialized) {
        initEva();
        evaMessages.dataset.initialized = "true";
      }
      setTimeout(() => evaInput.focus(), 300);
    }
  });

  evaClose.addEventListener("click", () => evaPanel.classList.remove("open"));

  evaReset.addEventListener("click", () => {
    evaMessages.innerHTML = "";
    evaMessages.dataset.initialized = "";
    initEva();
    evaMessages.dataset.initialized = "true";
  });

  // -------- INITIAL WELCOME --------
  function initEva() {
    addBotMessage("Hey there! 👋 I'm **Eva**, your tech companion at VeloTech. What can I help you discover today?");

    const suggestions = [
      "What are the best phone deals right now?",
      "Help me find a phone for photography",
      "Which phones support 5G under R15,000?",
      "I need help with my recent order"
    ];

    const wrap = document.createElement("div");
    wrap.className = "eva-suggested";
    wrap.innerHTML = `
      <p class="eva-suggested-label">SUGGESTED</p>
      ${suggestions.map(s => `<button class="eva-suggestion" data-msg="${s}">${s}</button>`).join("")}
    `;
    evaMessages.appendChild(wrap);

    wrap.querySelectorAll(".eva-suggestion").forEach(btn => {
      btn.addEventListener("click", () => {
        sendMessage(btn.dataset.msg);
      });
    });

    scrollEva();
  }

  // -------- ADD MESSAGE --------
  function addUserMessage(text) {
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    evaMessages.insertAdjacentHTML("beforeend", `
      <div class="eva-msg user">
        <div class="eva-bubble">${escapeHtml(text)}</div>
        <span class="eva-time">${time}</span>
      </div>
    `);
    scrollEva();
  }

  function addBotMessage(text) {
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    // Convert **bold** markdown
    const html = escapeHtml(text).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    evaMessages.insertAdjacentHTML("beforeend", `
      <div class="eva-msg bot">
        <div class="eva-bubble">${html}</div>
        <span class="eva-time">${time}</span>
      </div>
    `);
    scrollEva();
  }

  function escapeHtml(t) {
    return t.replace(/[&<>"']/g, c => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));
  }

  // -------- TYPING INDICATOR --------
  function showTyping() {
    evaMessages.insertAdjacentHTML("beforeend", `
      <div class="eva-msg bot typing" id="evaTyping">
        <div class="eva-bubble">
          <span class="dot"></span><span class="dot"></span><span class="dot"></span>
        </div>
      </div>
    `);
    scrollEva();
  }

  function hideTyping() {
    document.getElementById("evaTyping")?.remove();
  }

  // -------- SCROLL --------
  function scrollEva() {
    evaMessages.scrollTop = evaMessages.scrollHeight;
  }

  // -------- SEND MESSAGE --------
  function sendMessage(text) {
    if (!text.trim()) return;
    addUserMessage(text);
    evaInput.value = "";

    showTyping();
    setTimeout(() => {
      hideTyping();
      addBotMessage(getReply(text.toLowerCase()));
    }, 900 + Math.random() * 700);
  }

  // -------- REPLY LOGIC --------
  function getReply(msg) {
    // Quick action chips
    if (msg === "support") {
      return "Sure! You can reach our support team at **support@velotech.co.za** or use the contact form at the bottom of the page. Most queries get a reply within 2 hours. 💬";
    }
    if (msg === "track order") {
      return "To track your order, open the cart icon 🛒 and go to **Checkout** → then look for the order status. Or send me your order number (starts with **VT-**) and I'll check it for you! 📦";
    }
    if (msg === "pc builder") {
      return "Our **PC Builder** is coming soon! For now, tell me your budget and what you'll use it for and I'll suggest phones, laptops, or parts. 🖥️";
    }
    if (msg === "phone finder") {
      return "Ayy let's find your perfect phone! 📱 Tell me:\n• Your **budget**\n• What matters most (**camera**, **battery**, **gaming**, or **size**)\n• Android or iPhone preference";
    }

    // Keyword replies
    if (/(phone|iphone|samsung|pixel|galaxy)/.test(msg)) {
      return "We've got **17 top phones** available right now — iPhones, Samsung Galaxy, Google Pixel, and more. Tap **Phones** in the nav to browse, or tell me your budget and I'll recommend one! 📱";
    }
    if (/(cheap|budget|affordable)/.test(msg)) {
      return "Best value right now:\n• **Samsung Galaxy A17 5G** — R4,999\n• **Google Pixel 10a** — R10,999\n• **Apple iPhone 17** — R19,999\n\nWant me to filter by price on the Phones page? 💰";
    }
    if (/(gaming|game|fps|performance)/.test(msg)) {
      return "For **gaming**, check out:\n• **iPhone 17 Pro Max** — A19 Pro chip, best for intense titles\n• **Galaxy S26 Ultra** — Snapdragon 8 Elite Gen 5\n• **OnePlus 13** — 6,000 mAh battery, 100W charging\n\nCheck the **Gaming** category for more! 🎮";
    }
    if (/(camera|photo|picture|selfie)/.test(msg)) {
      return "Camera kings in our store:\n• **iPhone 17 Pro Max** — triple 48MP, 8x optical\n• **Oppo Find X9 Ultra** — 200MP, 10x optical\n• **Google Pixel 10 Pro** — best AI photography\n\nWant more camera details on any of these? 📸";
    }
    if (/(battery|charge|power)/.test(msg)) {
      return "Longest battery life in our lineup:\n• **iPhone 17 Pro Max** — up to 39hrs video\n• **OnePlus 13** — 6,000 mAh + 100W charge\n• **Oppo Find X9 Ultra** — 7,050 mAh\n\nCharge once, forget about it. 🔋";
    }
    if (/(5g)/.test(msg)) {
      return "Almost every phone we sell supports **5G**. Best budget 5G options:\n• **Galaxy A17 5G** — R4,999\n• **Pixel 10a** — R10,999\n\nWant a full 5G filter? 📡";
    }
    if (/(deal|discount|sale|special)/.test(msg)) {
      return "🔥 Hot deals on the site right now:\n• **iPhone 17** — R19,999 (was R22,999)\n• **Galaxy S26 Ultra** — R34,999 (was R39,999)\n• **OnePlus 13** — R22,999 (was R25,999)\n\nCheck the **Featured Deals** section on the homepage! 💥";
    }
    if (/(warranty|return|refund)/.test(msg)) {
      return "Every phone comes with a **12-month manufacturer warranty** and a **14-day return window**. If you're not happy, we'll sort it — no questions asked. ✅";
    }
    if (/(delivery|shipping|how long)/.test(msg)) {
      return "Delivery is **2–4 business days** across SA. Overnight options available in major metros. **Free shipping** on orders over R5,000! 🚚";
    }
    if (/(hi|hello|hey|yo|sup)/.test(msg)) {
      return "Hey! 👋 Ready to help you pick a phone, track an order, or just chat tech. What's on your mind?";
    }
    if (/(thank|thanks|thx)/.test(msg)) {
      return "Anytime! 🙌 If you need anything else, I'm right here.";
    }

    // Default
    return "Great question! 🤔 I'm still learning, but our team can help. Try asking about:\n• **Phone recommendations**\n• **Deals**\n• **Delivery or warranty**\n• **Tracking your order**";
  }

  // -------- SEND BUTTONS --------
  evaSend.addEventListener("click", () => sendMessage(evaInput.value));
  evaInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage(evaInput.value);
  });

  // -------- CHIP BUTTONS --------
  document.querySelectorAll(".eva-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      sendMessage(chip.dataset.msg);
    });
  });
}
