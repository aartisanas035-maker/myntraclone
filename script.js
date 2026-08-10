// ================= CART =================

let cartCount = 0;

function addToCart() {

    cartCount++;

    document.getElementById("cart-count").innerText = cartCount;

    alert("Product Added To Cart!");

}

// ================= LOGIN =================

function login() {

    let mobile = document.getElementById("mobile").value;
    let agree = document.getElementById("agree").checked;

    if (mobile == "") {

        alert("Please enter your mobile number.");

    }

    else if (mobile.length != 10) {

        alert("Please enter a valid 10-digit mobile number.");

    }

    else if (!agree) {

        alert("Please accept the Terms of Use and Privacy Policy.");

    }

    else {

        alert("Login Successful!");

        window.location.href = "index.html";

    }

}

let wishlistCount = 0;

function addToWishlist(){

    wishlistCount++;

    document.getElementById("wishlist-count").innerText = wishlistCount;

    alert("Added to Wishlist!");
}