// ===== Add to Cart =====
document.querySelectorAll(".add-cart").forEach(button => {
  button.addEventListener("click", () => {
    const card = button.closest(".product");
    const productName = card.querySelector("h3").innerText;
    alert(productName + " added to cart! 🛒");
  });
});

// ===== Newsletter Subscribe =====
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

// ===== Scroll Reveal Animation =====
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
