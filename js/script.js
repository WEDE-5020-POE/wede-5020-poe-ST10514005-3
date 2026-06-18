// cart.js

// Initialize cart from localStorage or empty
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update cart count in header
function updateCartCount() {
    const countElement = document.getElementById("cart-count");
    countElement.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

// Add product to cart
function addToCart(productName, productPrice) {
    const existingItem = cart.find(item => item.name === productName);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name: productName, price: parseFloat(productPrice), quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert(`${productName} added to cart!`);
}

// Attach event listeners to all "Add to Cart" buttons
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
        const productName = button.getAttribute("data-product");
        const productPrice = button.getAttribute("data-price");
        addToCart(productName, productPrice);
    });
});

// Run on page load
updateCartCount();





    