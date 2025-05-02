// Hacer las funciones globales
window.cart = JSON.parse(localStorage.getItem('cart')) || [];
console.log('Carrito inicial:', window.cart);

// Función para actualizar el carrito en el localStorage
window.updateLocalStorage = function() {
    console.log('Actualizando localStorage:', window.cart);
    localStorage.setItem('cart', JSON.stringify(window.cart));
}

// Función para actualizar el contador del carrito
window.updateCartCount = function() {
    console.log('Actualizando contador del carrito');
    const cartCounts = document.querySelectorAll('.cart-count');
    cartCounts.forEach(count => {
        count.textContent = window.cart.reduce((total, item) => total + item.cantidad, 0);
    });
}

// Función para actualizar el resumen de compra
window.updateResumenCompra = function() {
    console.log('Actualizando resumen de compra');
    const subtotal = window.cart.reduce((total, item) => total + (item.precio * item.cantidad), 0);
    const iva = subtotal * 0.19;
    const total = subtotal + iva;

    const subtotalElement = document.querySelector('.subtotal-precio');
    const ivaElement = document.querySelector('.iva-precio');
    const totalElement = document.querySelector('.total-precio');

    if (subtotalElement) subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    if (ivaElement) ivaElement.textContent = `$${iva.toFixed(2)}`;
    if (totalElement) totalElement.textContent = `$${total.toFixed(2)}`;
}

// Función para renderizar los productos en el carrito
window.renderCartItems = function() {
    console.log('Renderizando productos del carrito');
    const productosCarrito = document.querySelector('.productos-carrito');
    if (!productosCarrito) {
        console.log('No se encontró el contenedor de productos del carrito');
        return;
    }

    if (window.cart.length === 0) {
        productosCarrito.innerHTML = '<p class="carrito-vacio">Tu carrito está vacío</p>';
        return;
    }

    productosCarrito.innerHTML = window.cart.map((item, index) => `
        <div class="producto-en-carrito">
            <img src="images/producto${item.id}.jpg" alt="${item.nombre}">
            <div class="producto-info">
                <h3>${item.nombre}</h3>
                <p>$${item.precio.toFixed(2)}</p>
                <div class="cantidad-control">
                    <button onclick="updateQuantity(${index}, ${item.cantidad - 1})">-</button>
                    <span>${item.cantidad}</span>
                    <button onclick="updateQuantity(${index}, ${item.cantidad + 1})">+</button>
                </div>
            </div>
            <i class="fas fa-trash eliminar-producto" onclick="removeFromCart(${index})"></i>
        </div>
    `).join('');
}

// Función para actualizar la cantidad de un producto
window.updateQuantity = function(index, newQuantity) {
    console.log('Actualizando cantidad:', index, newQuantity);
    if (newQuantity < 1) {
        removeFromCart(index);
        return;
    }
    window.cart[index].cantidad = newQuantity;
    window.updateLocalStorage();
    window.renderCartItems();
    window.updateResumenCompra();
    window.updateCartCount();
}

// Función para eliminar un producto del carrito
window.removeFromCart = function(index) {
    console.log('Eliminando producto:', index);
    window.cart.splice(index, 1);
    window.updateLocalStorage();
    window.updateCartCount();
    window.renderCartItems();
    window.updateResumenCompra();
}

// Función para agregar un producto al carrito
window.addToCart = function(product) {
    console.log('Agregando producto al carrito:', product);
    const existingProduct = window.cart.find(item => item.id === product.id);
    if (existingProduct) {
        existingProduct.cantidad += 1;
    } else {
        window.cart.push({...product, cantidad: 1});
    }
    window.updateLocalStorage();
    window.updateCartCount();
    showNotification('Producto agregado al carrito');
}

// Función para mostrar notificaciones
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Inicializar el carrito cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    console.log('Página cargada, inicializando carrito');
    window.updateCartCount();
    window.renderCartItems();
    window.updateResumenCompra();

    // Agregar evento al botón de comprar
    const btnComprar = document.querySelector('.btn-comprar');
    if (btnComprar) {
        btnComprar.addEventListener('click', () => {
            if (window.cart.length === 0) {
                showNotification('Tu carrito está vacío');
                return;
            }
            // Aquí puedes agregar la lógica para procesar el pago
            showNotification('Procesando pago...');
        });
    }
}); 