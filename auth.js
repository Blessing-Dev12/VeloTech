/* ============================================
   VELOTECH — AUTH SYSTEM
   ============================================ */

// ---------- TAB SWITCHING ----------
const tabs = document.querySelectorAll(".auth-tab");
const forms = document.querySelectorAll(".auth-form");

function switchTab(tabName) {
  tabs.forEach(t => t.classList.toggle("active", t.dataset.tab === tabName));
  forms.forEach(f => f.classList.toggle("active", f.id === tabName + "Form"));
}

tabs.forEach(tab => {
  tab.addEventListener("click", () => switchTab(tab.dataset.tab));
});

document.querySelectorAll("[data-switch]").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    switchTab(link.dataset.switch);
  });
});

// ---------- USER STORAGE ----------
function getUsers() {
  return JSON.parse(localStorage.getItem("velotech-users")) || [];
}

function saveUsers(users) {
  localStorage.setItem("velotech-users", JSON.stringify(users));
}

function setCurrentUser(user) {
  // Never store password in "current user"
  const safe = { name: user.name, email: user.email };
  localStorage.setItem("velotech-current-user", JSON.stringify(safe));
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem("velotech-current-user"));
}

// ---------- IF ALREADY LOGGED IN ----------
if (getCurrentUser()) {
  // If they came here to checkout, send them back
  const redirect = new URLSearchParams(window.location.search).get("redirect");
  if (redirect === "checkout") {
    window.location.href = "checkout.html";
  }
}

// ---------- SIGN UP ----------
const signupForm = document.getElementById("signupForm");
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("signupName").value.trim();
  const email = document.getElementById("signupEmail").value.trim().toLowerCase();
  const password = document.getElementById("signupPassword").value;
  const confirm = document.getElementById("signupConfirm").value;

  // Validation
  if (password !== confirm) {
    alert("Passwords don't match!");
    return;
  }
  if (password.length < 6) {
    alert("Password must be at least 6 characters.");
    return;
  }

  const users = getUsers();

  // Check if email already exists
  if (users.find(u => u.email === email)) {
    alert("An account with that email already exists. Try signing in.");
    switchTab("login");
    return;
  }

  // Create user
  const newUser = { name, email, password };
  users.push(newUser);
  saveUsers(users);

  // Log them in
  setCurrentUser(newUser);

  // Send to checkout (or home)
  const redirect = new URLSearchParams(window.location.search).get("redirect");
  window.location.href = redirect === "checkout" ? "checkout.html" : "index.html";
});

// ---------- LOG IN ----------
const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value.trim().toLowerCase();
  const password = document.getElementById("loginPassword").value;

  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    alert("Incorrect email or password.");
    return;
  }

  setCurrentUser(user);

  const redirect = new URLSearchParams(window.location.search).get("redirect");
  window.location.href = redirect === "checkout" ? "checkout.html" : "index.html";
});
