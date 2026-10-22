// ================= DUMMY AUTH (no backend) =================
// Only this demo account can log in. Session is kept in localStorage.

const DEMO_USER = { mobile: "1234567890", name: "Demo User" };

function currentUser() {

    try {

        return JSON.parse(localStorage.getItem("myntraUser"));

    } catch (e) {

        return null;
    }
}

function requireLogin(action) {

    if (currentUser()) return true;

    sessionStorage.setItem(
        "afterLogin",
        location.pathname.split("/").pop() || "index.html"
    );

    alert("Please login first to " + action + ".");

    window.location.href = "login.html";

    return false;
}

// ================= BADGES =================

function storedCount(key) {

    return Number(localStorage.getItem(key) || 0);
}

function updateBadges() {

    let cart = document.getElementById("cart-count");
    if (cart) cart.innerText = storedCount("cartCount");

    let wishlist = document.getElementById("wishlist-count");
    if (wishlist) wishlist.innerText = storedCount("wishlistCount");
}

// ================= CART =================

function addToCart() {

    if (!requireLogin("add items to your cart")) return;

    localStorage.setItem("cartCount", storedCount("cartCount") + 1);

    updateBadges();

    alert("Product Added To Cart!");
}

// ================= WISHLIST =================

function addToWishlist() {

    if (!requireLogin("add items to your wishlist")) return;

    localStorage.setItem("wishlistCount", storedCount("wishlistCount") + 1);

    updateBadges();

    alert("Added to Wishlist!");
}

// ================= LOGIN =================

function login() {

    let mobile = document.getElementById("mobile").value.trim();
    let agree = document.getElementById("agree").checked;

    if (mobile == "") {

        alert("Please enter your mobile number.");

    }

    else if (!/^\d{10}$/.test(mobile)) {

        alert("Please enter a valid 10-digit mobile number.");

    }

    else if (!agree) {

        alert("Please accept the Terms of Use and Privacy Policy.");

    }

    else if (mobile !== DEMO_USER.mobile) {

        alert("Demo login only. Use mobile number " + DEMO_USER.mobile + ".");

    }

    else {

        localStorage.setItem("myntraUser", JSON.stringify(DEMO_USER));

        let next = sessionStorage.getItem("afterLogin") || "index.html";
        sessionStorage.removeItem("afterLogin");

        if (next === "login.html") next = "index.html";

        alert("Login Successful! Welcome " + DEMO_USER.name + ".");

        window.location.href = next;
    }
}

function logout() {

    localStorage.removeItem("myntraUser");
    localStorage.removeItem("cartCount");
    localStorage.removeItem("wishlistCount");

    window.location.href = "index.html";
}

// ================= HEADER STATE =================

document.addEventListener("DOMContentLoaded", function () {

    updateBadges();

    let link = document.querySelector('a.login-btn[href="login.html"]');
    let user = currentUser();

    if (!link || !user) return;

    let box = document.createElement("div");
    box.className = "user-box";

    let greeting = document.createElement("span");
    greeting.textContent = "Hi, " + user.name;

    let button = document.createElement("button");
    button.textContent = "Logout";
    button.onclick = logout;

    box.append(greeting, button);

    link.replaceWith(box);
});
