const grid = document.getElementById("phoneGrid");

function renderPhones(filter = "all") {
  const filtered = filter === "all"
    ? phonesData
    : phonesData.filter(p => p.brand === filter);

  grid.innerHTML = filtered.map(phone => {
    const stars = "⭐".repeat(Math.round(phone.rating));
    return `
      <div class="product">
        <span class="badge">${phone.badge}</span>
        <a href="phone-detail.html?id=${phone.id}" class="product-link">
          <img src="${phone.image}" alt="${phone.name}">
        </a>
        <div class="product-info">
          <a href="phone-detail.html?id=${phone.id}" class="product-link">
            <h3>${phone.name}</h3>
          </a>
          <div class="price">
            <span class="new-price">R${phone.price.toLocaleString()}</span>
            <span class="old-price">R${phone.oldPrice.toLocaleString()}</span>
          </div>
          <div class="rating">${stars} <span style="color:var(--text-dim); font-size:13px;">(${phone.reviews})</span></div>
          <button class="add-cart" data-name="${phone.name}">Add To Cart</button>
        </div>
      </div>
    `;
  }).join("");

  // Re-attach add-to-cart listeners
  document.querySelectorAll(".add-cart").forEach(button => {
    button.addEventListener("click", () => {
      alert(button.dataset.name + " added to cart! 🛒");
    });
  });
}

// Filter buttons
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderPhones(btn.dataset.filter);
  });
});

// Live search
const searchInput = document.getElementById("phoneSearch");
if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    const q = e.target.value.toLowerCase();
    const filtered = phonesData.filter(p => p.name.toLowerCase().includes(q));
    grid.innerHTML = filtered.map(phone => {
      const stars = "⭐".repeat(Math.round(phone.rating));
      return `
        <div class="product">
          <span class="badge">${phone.badge}</span>
          <a href="phone-detail.html?id=${phone.id}" class="product-link">
            <img src="${phone.image}" alt="${phone.name}">
          </a>
          <div class="product-info">
            <a href="phone-detail.html?id=${phone.id}" class="product-link">
              <h3>${phone.name}</h3>
            </a>
            <div class="price">
              <span class="new-price">R${phone.price.toLocaleString()}</span>
              <span class="old-price">R${phone.oldPrice.toLocaleString()}</span>
            </div>
            <div class="rating">${stars}</div>
            <button class="add-cart" data-name="${phone.name}">Add To Cart</button>
          </div>
        </div>
      `;
    }).join("");
  });
}

// Initial render
renderPhones();
// Re-bind add-to-cart buttons after render
if (window.attachAddToCartButtons) {
  setTimeout(() => window.attachAddToCartButtons(), 100);
}
