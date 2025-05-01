// Obtener el carrito del localStorage o crear uno nuevo
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Función para actualizar el carrito en el localStorage
function updateLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Función para actualizar el contador del carrito
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

// Función para actualizar el resumen de compra
function updateResumenCompra() {
    const subtotal = cart.reduce((total, item) => total + (item.precio * item.cantidad), 0);
    const iva = subtotal * 0.19;
    const total = subtotal + iva;

    document.querySelector('.subtotal-precio').textContent = `$${subtotal.toFixed(2)}`;
    document.querySelector('.iva-precio').textContent = `$${iva.toFixed(2)}`;
    document.querySelector('.total-precio').textContent = `$${total.toFixed(2)}`;
}

// Función para renderizar los productos en el carrito
function renderCartItems() {
    const productosCarrito = document.querySelector('.productos-carrito');
    if (!productosCarrito) return;

    if (cart.length === 0) {
        productosCarrito.innerHTML = '<p class="carrito-vacio">Tu carrito está vacío</p>';
        return;
    }

    productosCarrito.innerHTML = cart.map((item, index) => `
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
function updateQuantity(index, newQuantity) {
    if (newQuantity < 1) {
        removeFromCart(index);
        return;
    }
    cart[index].cantidad = newQuantity;
    updateLocalStorage();
    renderCartItems();
    updateResumenCompra();
}

// Función para eliminar un producto del carrito
function removeFromCart(index) {
    cart.splice(index, 1);
    updateLocalStorage();
    updateCartCount();
    renderCartItems();
    updateResumenCompra();
}

// Función para agregar un producto al carrito
function addToCart(product) {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
        existingProduct.cantidad += 1;
    } else {
        cart.push({...product, cantidad: 1});
    }
    updateLocalStorage();
    updateCartCount();
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
    updateCartCount();
    renderCartItems();
    updateResumenCompra();

    // Agregar evento al botón de comprar
    const btnComprar = document.querySelector('.btn-comprar');
    if (btnComprar) {
        btnComprar.addEventListener('click', () => {
            if (cart.length === 0) {
                showNotification('Tu carrito está vacío');
                return;
            }
            // Aquí puedes agregar la lógica para procesar el pago
            showNotification('Procesando pago...');
        });
    }
}); 