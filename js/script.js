// Product page java

// Initialize cart from localStorage or empty
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update cart count in header
function updateCartCount() {
    const countElement = document.getElementById("cart-count");

    if (countElement) {
    countElement.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }
}

// Add product to cart
function addToCart(productName, productPrice) {

    if (!productPrice || isNaN(productPrice)) {
        alert(`Price not set for ${productName}. Please contact bakery for custom order.`);
        return;
    }

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

// Attach event listeners
document.querySelectorAll(".add-to-cart-btn").forEach(button => {
    button.addEventListener("click", () => {

        const productName = button.dataset.product;
        const productPrice = button.dataset.price;

        addToCart(productName, productPrice);
    });
});

// Run on page load
updateCartCount();

//Cart page java 


function displayCart() {

    const cartItems = document.getElementById("cart-items");
    
    if (!cartItems) {
        return;
    }

    const cartTotal = document.getElementById("cart-total");
    const totalItems = document.getElementById("total-items");

    cartItems.innerHTML = " ";

    let grandTotal = 0;
    let numberOfItems = 0;

    // If cart is empty
    if (cart.length === 0) {
        cartItems.innerHTML =
        "<tr><td colspan='5'>Your cart is empty.</td></tr>";

        cartTotal.textContent = "Total: R0";
        totalItems.textContent = "Items: 0";

        return;
    }

        //Display each item
        cart.forEach((item, index) =>{

            const subtotal = item.price * item.quantity;
            
            grandTotal += subtotal;
            numberOfItems += item.quantity;

            cartItems.innerHTML += `
            <tr>
            <td>${item.name}</td>
            <td>R${item.price}</td>
            <td>${item.quantity}</td>
            <td>R${subtotal}</td>
            <td>
                <button onclick="removeItem(${index})">
                    Remove
                </button>
            </td>
            </tr>
            `;
        });

        cartTotal.textContent = `Total: R${grandTotal}`;
        totalItems.textContent = `Items: ${numberOfItems}`;

    }

    //Remove item from cart
    function removeItem(index) {

        cart.splice(index, 1);

        localStorage.setItem(
        "cart",
        JSON.stringify(cart)

    );

    displayCart();

}

// Load cart when page opens
displayCart();

//Display the order summary

function displayCheckout() {

    const checkoutItems = document.getElementById("checkout-items");

    if (!checkoutItems) {
        return;
    }

    const checkoutTotal = document.getElementById("checkout-total");

    let total = 0;
    checkoutItems.innerHTML = "";
    
    if (cart.length === 0) {
        checkoutItems.innerHTML = "<p>Your cart is empty.</p>";
        checkoutTotal.textContext = "Total: R0";
        return;

    }

    cart.forEach(item => {

        const subtotal = item.price * item.quantity;
        total += subtotal;

        checkoutItems.innerHTML += `
        <p>
        ${item.name} - 
        Quantity: ${item.quantity} - 
        Subtotal: R${subtotal}
        </p>
        
        `;
    });

    checkoutTotal.textContent = `Total: R${total}`;
}

//Finalise the order

const checkoutForm = document.getElementById("checkout-form");

if (checkoutForm) {

    checkoutForm.addEventListener("submit", function (event) {
        
        event.preventDefault();

        if (cart.length ===0) {
            alert("Your cart empty. Please add items first.");
            return;
        }

        const customerName =
        document.getElementById("customerName").value;

        const paymentMethod =
        document.querySelector(
            'input[name="payment"]:checked'
        ).value;

        alert(
            `Order Successful!

            Thank you, ${customerName}!

            Your order has been placed successfully.

            Payment Method: ${paymentMethod}

            We will contact you shortly regarding your order.`

        );

        //Empty cart
        cart = [];
        localStorage.setItem("cart", JSON.stringify(cart));

        //Clear the form
        checkoutForm.reset();

        //Refresh summary
        displayCheckout();

        // Opional redirect after 3 seconds
        setTimeout(() => {
            window.location.href = "index.html";
        }, 3000);
        });

    }

    displayCheckout();










    