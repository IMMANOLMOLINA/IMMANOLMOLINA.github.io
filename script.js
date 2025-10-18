// Mostrar barra de navegación al hacer scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > window.innerHeight * 0.5) {
        navbar.classList.add('show');
    } else {
        navbar.classList.remove('show');
    }
});

// Navegación entre páginas
function navigateToPage(pageId) {
    // Ocultar todas las páginas
    document.querySelectorAll('.page-content').forEach(page => {
        page.classList.remove('active');
    });
    
    // Mostrar la página seleccionada
    document.getElementById(`${pageId}-content`).classList.add('active');
    
    // Desplazarse al inicio de la página
    window.scrollTo(0, 0);
    
    // Actualizar estado de navegación (para el botón de retroceso)
    history.pushState({page: pageId}, '', `#${pageId}`);
}

// Configurar event listeners para navegación
document.querySelectorAll('nav a, .footer-column a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageId = link.getAttribute('data-page');
        
        if (pageId) {
            navigateToPage(pageId);
        }
    });
});

// Manejo del botón de retroceso del navegador
window.addEventListener('popstate', (e) => {
    if (e.state && e.state.page) {
        navigateToPage(e.state.page);
    } else {
        navigateToPage('home');
    }
});

// Manejo del formulario de newsletter
document.getElementById('newsletter-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    
    // Simular envío del formulario
    if (email) {
        alert(`¡Gracias por suscribirte con el email: ${email}!`);
        e.target.reset();
    }
});

// Inicialización - asegurarse de que la página de inicio esté activa al cargar
document.addEventListener('DOMContentLoaded', () => {
    // Verificar si hay un hash en la URL
    const hash = window.location.hash.substring(1);
    const validPages = ['home', 'nosotros', 'menu', 'horarios', 'contacto'];
    
    if (validPages.includes(hash)) {
        navigateToPage(hash);
    } else {
        navigateToPage('home');
    }
});

// Efecto de scroll suave para enlaces de ancla
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animación de aparición al hacer scroll para elementos
const fadeElements = document.querySelectorAll('.fade-in');
const appearOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            appearOnScroll.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

// Añadir la clase fade-in a elementos que quieras animar
document.querySelectorAll('.content-section, .page-content > *').forEach(el => {
    el.classList.add('fade-in');
    appearOnScroll.observe(el);
});