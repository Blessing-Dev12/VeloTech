// Get phone ID from URL
const params = new URLSearchParams(window.location.search);
const phoneId = params.get("id");
const phone = getPhoneById(phoneId);

const detailSection = document.getElementById("productDetail");
const breadcrumbName = document.getElementById("breadcrumbName");

if (!phone) {
  detailSection.innerHTML = `
    <div style="text-align:center; padding:80px 20px;">
      <h2>Phone not found 😕</h2>
      <p style="color:var(--text-dim); margin:20px 0;">The phone you're looking for doesn't exist.</p>
      <a href="phones.html" class="detail-btn">Browse All Phones</a>
    </div>
  `;
} else {
  document.title = phone.name + " — VeloTech";
  breadcrumbName.textContent = phone.name;

  const specsHTML = Object.entries(phone.specs).map(([key, value]) => `
    <div class="spec-row">
      <span class="spec-label">${key.replace(/_/g, " ")}</span>
      <span class="spec-value">${value}</span>
    </div>
  `).join("");

  const featuresHTML = phone.features.map(f => `
    <li class="feature-item">✓ ${f}</li>
  `).join("");

  const stars = "⭐".repeat(Math.round(phone.rating)) + "☆".repeat(5 - Math.round(phone.rating));

  detailSection.innerHTML = `
    <div class="detail-grid">
      <div class="detail-image">
        <span class="badge">${phone.badge}</span>
        <img src="${phone.image}" alt="${phone.name}">
      </div>

      <div class="detail-info">
        <h1>${phone.name}</h1>
        <div class="detail-rating">${stars} <span>${phone.rating} (${phone.reviews} reviews)</span></div>

        <div class="detail-price">
          <span class="new-price">R${phone.price.toLocaleString()}</span>
          <span class="old-price">R${phone.oldPrice.toLocaleString()}</span>
        </div>

        <p class="detail-description">${phone.description}</p>

        <button class="add-cart detail-add-cart" data-name="${phone.name}">
          Add To Cart — R${phone.price.toLocaleString()}
        </button>
      </div>
    </div>

    <div class="detail-sections">
      <div class="detail-section">
        <h2>📋 Full Specifications</h2>
        <div class="specs-grid">${specsHTML}</div>
      </div>

      <div class="detail-section">
        <h2>✨ Key Features</h2>
        <ul class="features-list">${featuresHTML}</ul>
      </div>
    </div>
  `;

  // Add to cart button on detail page
  document.querySelectorAll(".detail-add-cart").forEach(btn => {
    btn.addEventListener("click", () => {
      alert(btn.dataset.name + " added to cart! 🛒");
    });
  });
}
