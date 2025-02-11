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