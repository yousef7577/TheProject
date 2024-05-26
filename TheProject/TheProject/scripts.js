document.addEventListener('DOMContentLoaded', function() {
    const productBtns = document.querySelectorAll('.product-btn');

    productBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const productContainer  = this.parentElement;
            const productInfo = this.textContent;

            alert(`You clicked on ${productInfo}.`);
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function addToCart(product) {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        window.location.href = 'cart.html';
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    }

    function updateCart() {
        const cartContainer = document.getElementById('cart-container');
        cartContainer.innerHTML = '';
        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `${item.name} - $${item.price} <button class="btn btn-danger remove-from-cart" data-index="${index}">Remove</button>`;
            cartContainer.appendChild(itemElement);
        });

        document.querySelectorAll('.remove-from-cart').forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                removeFromCart(index);
            });
        });
    }

    if (document.querySelectorAll('.add-to-cart').length > 0) {
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                const product = {
                    name: this.getAttribute('data-name'),
                    price: this.getAttribute('data-price')
                };
                addToCart(product);
            });
        });
    } else {
        updateCart();
    }
});