/* ============================================
   VELOTECH — CHECKOUT SYSTEM
   ============================================ */

// Get cart from localStorage
let cart = JSON.parse(localStorage.getItem("velotech-cart")) || [];

// Delivery fee rules
const FREE_SHIPPING_THRESHOLD = 5000;
const SHIPPING_FEE = 150;

// -------- RENDER SUMMARY --------
function renderSummary() {
  const itemsEl = document.getElementById("summaryItems");

  if (cart.length === 0) {
    itemsEl.innerHTML = `<p style="color:var(--text-dim);text-align:center;padding:20px 0;">
      Your cart is empty. <a href="phones.html" style="color:var(--accent);">Shop now →</a>
    </p>`;
    document.getElementById("summarySubtotal").textContent = "R0";
    document.getElementById("summaryShipping").textContent = "R0";
    document.getElementById("summaryTotal").textContent = "R0";
    document.getElementById("placeOrderBtn").disabled = true;
    document.getElementById("placeOrderBtn").style.opacity = ".5";
    return;
  }

  itemsEl.innerHTML = cart.map(item => `
    <div class="summary-item">
      <div>
        <strong>${item.name}</strong>
        <small>Qty: ${item.qty}</small>
      </div>
      <span>R${(item.price * item.qty).toLocaleString()}</span>
    </div>
  `).join("");

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;

  document.getElementById("summarySubtotal").textContent = "R" + subtotal.toLocaleString();
  document.getElementById("summaryShipping").textContent = shipping === 0 ? "FREE" : "R" + shipping;
  document.getElementById("summaryTotal").textContent = "R" + total.toLocaleString();
}

// -------- SHOW/HIDE CARD FIELDS --------
const payRadios = document.querySelectorAll('input[name="payment"]');
const cardFields = document.getElementById("cardFields");

payRadios.forEach(radio => {
  radio.addEventListener("change", () => {
    if (radio.value === "card") {
      cardFields.style.display = "block";
    } else {
      cardFields.style.display = "none";
    }
  });
});

// -------- CARD NUMBER FORMATTING --------
const cardNumberInput = document.getElementById("cardNumber");
if (cardNumberInput) {
  cardNumberInput.addEventListener("input", (e) => {
    let v = e.target.value.replace(/\s/g, "").replace(/\D/g, "");
    v = v.match(/.{1,4}/g)?.join(" ") || "";
    e.target.value = v;
  });
}

// -------- EXPIRY FORMATTING --------
const expiryInput = document.getElementById("cardExpiry");
if (expiryInput) {
  expiryInput.addEventListener("input", (e) => {
    let v = e.target.value.replace(/\D/g, "");
    if (v.length >= 2) v = v.slice(0, 2) + "/" + v.slice(2, 4);
    e.target.value = v;
  });
}

// -------- GENERATE ORDER NUMBER --------
function generateOrderNumber() {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 900 + 100);
  return "VT-" + timestamp + random;
}

// -------- FORM SUBMIT --------
const form = document.getElementById("checkoutForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const paymentMethod = document.querySelector('input[name="payment"]:checked').value;

  // Validate card fields if card selected
  if (paymentMethod === "card") {
    const num = document.getElementById("cardNumber").value.replace(/\s/g, "");
    const exp = document.getElementById("cardExpiry").value;
    const cvv = document.getElementById("cardCvv").value;

    if (num.length < 13) {
      alert("Please enter a valid card number.");
      return;
    }
    if (!/^\d{2}\/\d{2}$/.test(exp)) {
      alert("Please enter expiry as MM/YY.");
      return;
    }
    if (cvv.length < 3) {
      alert("Please enter a valid CVV.");
      return;
    }
  }

  // Show "processing" state
  const btn = document.getElementById("placeOrderBtn");
  btn.textContent = "Processing...";
  btn.disabled = true;

  // Simulate payment processing
  setTimeout(() => {
    // Build order
    const order = {
      orderNumber: generateOrderNumber(),
      date: new Date().toISOString(),
      customer: {
        firstName: document.getElementById("firstName").value,
        lastName:  document.getElementById("lastName").value,
        email:     document.getElementById("email").value,
        phone:     document.getElementById("phone").value,
        address:   document.getElementById("address").value,
        city:      document.getElementById("city").value,
        postal:    document.getElementById("postal").value,
        province:  document.getElementById("province").value
      },
      paymentMethod,
      items: cart,
      subtotal: cart.reduce((s, i) => s + i.price * i.qty, 0),
      shipping: 0,
      total: 0
    };

    order.shipping = order.subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
    order.total = order.subtotal + order.shipping;

    // Save order to localStorage
    const orders = JSON.parse(localStorage.getItem("velotech-orders")) || [];
    orders.push(order);
    localStorage.setItem("velotech-orders", JSON.stringify(orders));

    // Clear cart
    localStorage.removeItem("velotech-cart");

    // Show success
    document.getElementById("orderNumber").textContent = order.orderNumber;
    document.getElementById("successOverlay").classList.add("active");

    // Reset button
    btn.textContent = "Place Order →";
    btn.disabled = false;
  }, 1800); // 1.8 second "processing" feel
});

// -------- PRE-FILL USER INFO --------
const currentUser = JSON.parse(localStorage.getItem("velotech-current-user"));
if (currentUser) {
  const nameParts = (currentUser.name || "").split(" ");
  const firstName = document.getElementById("firstName");
  const lastName  = document.getElementById("lastName");
  const email     = document.getElementById("email");

  if (firstName && nameParts[0]) firstName.value = nameParts[0];
  if (lastName  && nameParts[1]) lastName.value  = nameParts.slice(1).join(" ");
  if (email     && currentUser.email) email.value = currentUser.email;
}
// -------- INIT --------
renderSummary();
