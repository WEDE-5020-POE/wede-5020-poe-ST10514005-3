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

    //Enquiry page javascript

    const enquiryForm = document.querySelector(".enquiry-content form");

    if (enquiryForm) {

        const emailInput = document.getElementById("femail");
        const phoneInput = document.getElementById("fphone");

        const emailFeedback = 
        document.getElementById("email-feedback");

        const phoneFeedback = 
        document.getElementById("phone-feedback");

         const popup =
        document.getElementById("success-popup");

    const closePopup =
        document.getElementById("close-popup");


        //Email validation
        emailInput.addEventListener("input", () =>  {
             
            const emailPattern = 
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (emailPattern.test(emailInput.value)) {
                emailFeedback.textContent =
                "Valid email address";
                emailFeedback.style.color = "green";
            } else {
                emailFeedback.textContent = 
                "Please enter a valid email";
                emailFeedback.style.color = "red";
            }
        });
        
        //South African phone validation
        phoneInput.addEventListener("input", () => {
                
            const phonePattern =
            /^0\d{9}$/;

            if (phonePattern.test(phoneInput.value)) {
                phoneFeedback.textContent =
                "Valid phone number";
                phoneFeedback.style.color = "green";
            } else {
                phoneFeedback.textContent =
                "Enter a valid 10-digit phone number";
                phoneFeedback.style.color = "red";
            }

        });

        //Submit form
        enquiryForm.addEventListener("submit", function (event){

            event.preventDefault();

popup.style.display = "flex";

enquiryForm.reset();

emailFeedback.textContent = "";
phoneFeedback.textContent = "";

 setTimeout(() => {
                popup.style.display = "none";
            }, 3000);
        }
    );

    // Close popup button
    closePopup.addEventListener(
        "click",
        function () {
            popup.style.display = "none";
        }
    );
}


        //Contact page javascript 

        const contactForm = document.getElementById("contact-form");

        if (contactForm) {

            const emailInput = document.getElementById("customerEmail");
            const phoneInput = document.getElementById("customerPhone");

            //Create feedback messages
            const emailFeedback = document.createElement("small");
            const phoneFeedback = document.createElement("small");

            emailInput.after(emailFeedback);
            phoneInput.after(phoneFeedback);

        // Email Validation
    emailInput.addEventListener("input", () => {

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailPattern.test(emailInput.value)) {
            emailFeedback.textContent =
                "✓ Valid email address";
            emailFeedback.style.color = "green";
        } else {
            emailFeedback.textContent =
                "✗ Please enter a valid email address";
            emailFeedback.style.color = "red";
        }
    });

    // South African Phone Validation
    phoneInput.addEventListener("input", () => {

        const phonePattern =
            /^0\d{9}$/;

        if (phonePattern.test(phoneInput.value)) {
            phoneFeedback.textContent =
                "✓ Valid phone number";
            phoneFeedback.style.color = "green";
        } else {
            phoneFeedback.textContent =
                "✗ Enter a valid 10-digit phone number";
            phoneFeedback.style.color = "red";
        }
    });

    // Submit Form
    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const customerName =
            document.getElementById("customerName").value;

        alert(
            `🎂 Thank you, ${customerName}!

Your message has been prepared successfully.

Click OK to continue sending your email to Honeybunny Crummy Bakery.`
        );

        // Opens user's email application
        window.location.href =
            "mailto:info@honeybunnycrummy.co.za";

        // Reset form
        contactForm.reset();

        emailFeedback.textContent = "";
        phoneFeedback.textContent = "";
    });
}

const mapContainer =
    document.getElementById("map");

if (mapContainer) {

    const map = L.map("map").setView(
        [-25.521991, 28.108446],
        15
    );

    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution:
                "&copy; OpenStreetMap contributors"
        }
    ).addTo(map);

    const marker = L.marker(
        [-25.521991, 28.108446]
    ).addTo(map);

    marker.bindPopup(
        `
        <h3>🎂 Honeybunny Crummy Bakery</h3>
        <p>
            714 Block H<br>
            Pretoria, South Africa
        </p>
        `
    );

    marker.openPopup();
}

// Sweet Quotes
const quoteBtn =
    document.getElementById("quote-btn");

const quoteText =
    document.getElementById("quote-text");

const quotes = [

    "🧁 Happiness is homemade.",

    "🍪 Life is what you bake of it.",

    "🎂 A party without cake is just a meeting.",

    "🍰 Sweet treats make sweet memories.",

    "🥐 Every day deserves a little dessert."

];

if (quoteBtn) {

    quoteBtn.addEventListener(
        "click",

        function () {

            const random =
                Math.floor(
                    Math.random() *
                    quotes.length
                );

            quoteText.textContent =
                quotes[random];
        }
    );
}

// Greeting Message
const welcome =
    document.getElementById("welcome-message");

if (welcome) {

    const hour =
        new Date().getHours();

    if (hour < 12) {
        welcome.textContent =
            "🌸 Good Morning! Start your day with something sweet!";
    }
    else if (hour < 18) {
        welcome.textContent =
            "🧁 Good Afternoon! Treat yourself to freshly baked delights!";
    }
    else {
        welcome.textContent =
            "🍰 Good Evening! End your day with something delicious!";
    }
}
             

        

