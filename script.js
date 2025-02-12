// Cart functionality
let cart = [];
let totalAmount = 0;

// Add to cart
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const product = {
      id: button.getAttribute('data-id'),
      name: button.getAttribute('data-name'),
      price: parseFloat(button.getAttribute('data-price')),
    };
    cart.push(product);
    updateCart();
  });
});

// Update cart
function updateCart() {
  const cartCount = document.getElementById('cart-count');
  cartCount.textContent = cart.length;
}

// Initialize cart count on page load
updateCart();

document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.product-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transform = 'translateY(-5px) scale(1.02)';
                entry.target.style.boxShadow = '0 10px 20px rgba(255, 121, 59, 0.485)';
                // Stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3 // Trigger when 30% of the card is visible
    });

    cards.forEach(card => {
        // Reset initial styles
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.15)';
        card.style.transition = 'transform 0.4s ease, box-shadow 0.4s ease';
        // Start observing
        observer.observe(card);
    });
});
