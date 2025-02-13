
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let totalAmount = 0;

// Add to cart function
function addToCart(name, price, image) {
    const product = {
        name: name,
        price: parseFloat(price),
        image: image,
        quantity: 1
    };

    // Check if product already exists in cart
    const existingProductIndex = cart.findIndex(item => item.name === name);

    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += 1;
    } else {
        cart.push(product);
    }

   
    localStorage.setItem('cart', JSON.stringify(cart));
    
    updateCart();
    
    
    showNotification(`${name} added to cart!`);
}

// Update cart function
function updateCart() {
    const cartCount = document.getElementById('cart-count');
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

   
    totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    localStorage.setItem('cart', JSON.stringify(cart));
}

//notification function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = message;
    
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: var(--primary-color);
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        z-index: 1000;
        opacity: 0;
        transform: translateY(-20px);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 10);
    
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}


function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

// Product card animation
document.addEventListener('DOMContentLoaded', function() {
    
    updateCart();
    
    const cards = document.querySelectorAll('.product-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transform = 'translateY(-5px) scale(1.02)';
                entry.target.style.boxShadow = '0 10px 20px rgba(255, 121, 59, 0.485)';
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3 
    });
    
    cards.forEach(card => {
        
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.15)';
        card.style.transition = 'transform 0.4s ease, box-shadow 0.4s ease';
        
        observer.observe(card);
    });
});

//event listener to all add-to-cart buttons
document.querySelectorAll('.cart-button').forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = button.closest('.product-card');
        const name = card.querySelector('h3').textContent;
        const price = parseFloat(card.querySelector('.price').textContent.replace('₹', '').replace('/-', ''));
        const image = card.querySelector('img').src;
        addToCart(name, price, image);
    });
});
