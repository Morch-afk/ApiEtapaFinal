document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = JSON.parse(localStorage.getItem('selectedProduct'));

    if (!product) {
        alert('No se encontró información del producto.');
        window.location.href = './index.html';
        return;
    }

    document.getElementById('product-name').textContent = product.name;
    document.getElementById('product-image').src = product.url;
    document.getElementById('product-name-detail').textContent = product.name;
    document.getElementById('product-category').textContent = `Categoría: ${product.name}`;
    document.getElementById('product-price').textContent = product.price;

    const quantityInput = document.getElementById('product-quantity');
    document.getElementById('increase-quantity').addEventListener('click', () => {
        let quantity = parseInt(quantityInput.value);
        if (quantity < 10) quantityInput.value = quantity + 1;
    });
    document.getElementById('decrease-quantity').addEventListener('click', () => {
        let quantity = parseInt(quantityInput.value);
        if (quantity > 1) quantityInput.value = quantity - 1;
    });

    document.querySelector('.button-buy').addEventListener('click', () => {
        const existingItem = cart.find(item => item.id === product.id);
        const quantity = parseInt(quantityInput.value);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ ...product, quantity });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Producto agregado al carrito.');
    });

    const cartContainer = document.getElementById('cart-items');
    if (cart.length > 0) {
        cart.forEach(item => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <img src="${item.url}" alt="Producto">
                <span>${item.name} - Cantidad: ${item.quantity} - Precio: $${item.price * item.quantity}</span>
            `;
            cartContainer.appendChild(listItem);
        });
    } else {
        cartContainer.textContent = 'El carrito está vacío.';
    }
});
