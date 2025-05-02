// Funcionalidad del buscador
const searchForm = document.querySelector('.search-container');
if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchTerm = searchForm.querySelector('input').value;
        // Aquí puedes implementar la lógica de búsqueda
        console.log('Buscando:', searchTerm);
    });
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

// Agregar estilos para las notificaciones
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: var(--primary-color);
        color: white;
        padding: 1rem 2rem;
        border-radius: 4px;
        animation: slideIn 0.3s ease-out;
    }

    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    body {
        transition: opacity 0.3s ease;
    }
`;
document.head.appendChild(style);

// Transiciones suaves entre páginas
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('a');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.href && link.href.includes(window.location.hostname)) {
                e.preventDefault();
                document.body.style.opacity = '0';
                setTimeout(() => {
                    window.location.href = link.href;
                }, 300);
            }
        });
    });

    // Animación de entrada
    document.body.style.opacity = '1';
});

// Menú móvil
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Cerrar menú al hacer clic en un enlace
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Ajustar el padding del body cuando el navbar es fijo
    const navbar = document.querySelector('.navbar');
    const mainContent = document.querySelector('main');
    if (navbar && mainContent) {
        const navbarHeight = navbar.offsetHeight;
        mainContent.style.paddingTop = `${navbarHeight}px`;
    }
}); 