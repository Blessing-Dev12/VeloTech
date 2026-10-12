/* ============================================
   VELOTECH — PHONES GRID + FILTERS
   ============================================ */

const grid = document.getElementById("phoneGrid");
const resultsCount = document.getElementById("resultsCount");

// -------- STATE --------
let state = {
  brands: [],
  minPrice: 0,
  maxPrice: 50000,
  minRating: 0,
  sort: "default",
  search: ""
};

// -------- RENDER --------
function renderPhones() {
  let filtered = [...phonesData];

  // Brand filter
  if (state.brands.length > 0) {
    filtered = filtered.filter(p => state.brands.includes(p.brand));
  }

  // Price filter
  filtered = filtered.filter(p =>
    p.price >= state.minPrice && p.price <= state.maxPrice
  );

  // Rating filter
  if (state.minRating > 0) {
    filtered = filtered.filter(p => p.rating >= state.minRating);
  }

  // Search filter
  if (state.search) {
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(state.search.toLowerCase())
    );
  }

  // Sorting
  switch (state.sort) {
    case "price-low":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      filtered.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case "name":
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
  }

  // Update results count
  if (resultsCount) {
    resultsCount.textContent = `Showing ${filtered.length} of ${phonesData.length} phones`;
  }

  // Empty state
  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column:1/-1; text-align:center; padding:60px 20px;">
        <h2 style="color:var(--text-dim);">No phones match your filters 😢</h2>
        <p style="color:var(--text-dim); margin-top:10px;">Try adjusting them.</p>
      </div>
    `;
    return;
  }

  // Render phones
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

  // Re-bind add-to-cart
  if (window.attachAddToCartButtons) {
    window.attachAddToCartButtons();
  }
}

// -------- BRAND COUNTS --------
function updateBrandCounts() {
  document.querySelectorAll(".count").forEach(el => {
    const brand = el.dataset.brand;
    const count = phonesData.filter(p => p.brand === brand).length;
    el.textContent = count;
  });
}

// -------- ACTIVE FILTER TAGS --------
function renderActiveFilters() {
  const box = document.getElementById("activeFilters");
  if (!box) return;

  const tags = [];

  state.brands.forEach(b => {
    tags.push(`<span class="tag">${b} <button data-remove-brand="${b}">✕</button></span>`);
  });

  if (state.minPrice > 0 || state.maxPrice < 50000) {
    tags.push(`<span class="tag">R${state.minPrice.toLocaleString()} - R${state.maxPrice.toLocaleString()} <button data-remove="price">✕</button></span>`);
  }

  if (state.minRating > 0) {
    tags.push(`<span class="tag">${state.minRating}★+ <button data-remove="rating">✕</button></span>`);
  }

  box.innerHTML = tags.length ? tags.join("") : "";

  // Removal handlers
  box.querySelectorAll("[data-remove-brand]").forEach(btn => {
    btn.addEventListener("click", () => {
      const brand = btn.dataset.removeBrand;
      state.brands = state.brands.filter(b => b !== brand);
      document.querySelectorAll(".brand-filter").forEach(cb => {
        if (cb.value === brand) cb.checked = false;
      });
      renderActiveFilters();
      renderPhones();
    });
  });

  box.querySelectorAll("[data-remove]").forEach(btn => {
    btn.addEventListener("click", () => {
      const type = btn.dataset.remove;
      if (type === "price") {
        state.minPrice = 0;
        state.maxPrice = 50000;
        document.getElementById("priceMin").value = 0;
        document.getElementById("priceMax").value = 50000;
        updatePriceLabels();
      }
      if (type === "rating") {
        state.minRating = 0;
        document.querySelector('input[name="ratingFilter"][value="0"]').checked = true;
      }
      renderActiveFilters();
      renderPhones();
    });
  });
}

// -------- PRICE SLIDER --------
const priceMin = document.getElementById("priceMin");
const priceMax = document.getElementById("priceMax");
const priceMinLabel = document.getElementById("priceMinLabel");
const priceMaxLabel = document.getElementById("priceMaxLabel");

function updatePriceLabels() {
  priceMinLabel.textContent = "R" + Number(priceMin.value).toLocaleString();
  priceMaxLabel.textContent = "R" + Number(priceMax.value).toLocaleString();
}

if (priceMin && priceMax) {
  priceMin.addEventListener("input", () => {
    if (Number(priceMin.value) > Number(priceMax.value)) {
      priceMin.value = priceMax.value;
    }
    state.minPrice = Number(priceMin.value);
    updatePriceLabels();
    renderActiveFilters();
    renderPhones();
  });

  priceMax.addEventListener("input", () => {
    if (Number(priceMax.value) < Number(priceMin.value)) {
      priceMax.value = priceMin.value;
    }
    state.maxPrice = Number(priceMax.value);
    updatePriceLabels();
    renderActiveFilters();
    renderPhones();
  });
}

// -------- BRAND CHECKBOXES --------
document.querySelectorAll(".brand-filter").forEach(cb => {
  cb.addEventListener("change", () => {
    state.brands = Array.from(document.querySelectorAll(".brand-filter:checked"))
      .map(el => el.value);
    renderActiveFilters();
    renderPhones();
  });
});

// -------- RATING RADIOS --------
document.querySelectorAll('input[name="ratingFilter"]').forEach(radio => {
  radio.addEventListener("change", () => {
    state.minRating = Number(radio.value);
    renderActiveFilters();
    renderPhones();
  });
});

// -------- SORT --------
const sortSelect = document.getElementById("sortSelect");
if (sortSelect) {
  sortSelect.addEventListener("change", () => {
    state.sort = sortSelect.value;
    renderPhones();
  });
}

// -------- RESET --------
document.getElementById("filterReset")?.addEventListener("click", () => {
  state = { brands: [], minPrice: 0, maxPrice: 50000, minRating: 0, sort: "default", search: "" };

  document.querySelectorAll(".brand-filter").forEach(cb => cb.checked = false);
  document.querySelector('input[name="ratingFilter"][value="0"]').checked = true;
  document.getElementById("priceMin").value = 0;
  document.getElementById("priceMax").value = 50000;
  document.getElementById("sortSelect").value = "default";
  document.getElementById("phoneSearch").value = "";

  updatePriceLabels();
  renderActiveFilters();
  renderPhones();
});

// -------- MOBILE FILTER TOGGLE --------
const filterToggle = document.getElementById("filterToggle");
const filterSidebar = document.getElementById("filterSidebar");

if (filterToggle) {
  filterToggle.addEventListener("click", () => {
    filterSidebar.classList.toggle("open-mobile");
  });
}

// -------- SEARCH --------
const searchInput = document.getElementById("phoneSearch");
if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    state.search = e.target.value;
    renderPhones();
  });
}

// -------- INIT --------
updateBrandCounts();
updatePriceLabels();
renderActiveFilters();
renderPhones();
