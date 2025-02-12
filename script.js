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
  const options = {
    root: null,
    rootMargin: '-20% 0px',
    threshold: 0.3
  };

  let currentActiveCard = null;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Remove active class from previous card
        if (currentActiveCard && currentActiveCard !== entry.target) {
          currentActiveCard.classList.remove('active');
        }
        
        // Add active class to current card
        entry.target.classList.add('active');
        currentActiveCard = entry.target;
      } else {
        // Only remove active class if card is scrolled past significantly
        if (entry.boundingClientRect.top > window.innerHeight) {
          entry.target.classList.remove('active');
        }
      }
    });
  }, options);

  // Observe all product cards
  document.querySelectorAll('.product-card').forEach(card => {
    observer.observe(card);
  });
});
