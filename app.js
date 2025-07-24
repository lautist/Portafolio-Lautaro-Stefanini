// app.js

document.addEventListener('DOMContentLoaded', () => {

    // --- Animación de Scroll ---
    const animatedElements = document.querySelectorAll('.animated');

    const checkScroll = () => {
        const scrollPosition = window.innerHeight + window.scrollY;
        animatedElements.forEach(element => {
            if (scrollPosition > element.offsetTop + 100) {
                element.classList.add('fadeIn');
            }
        });
    };

    checkScroll();
    window.addEventListener('scroll', checkScroll);

    // --- Alternador de Tema de Color ---
    const themeToggleButton = document.getElementById('cambiar-color');
    const body = document.body;
    
    // Obtener la etiqueta meta del color del tema
    const themeMetaTag = document.querySelector('meta[name="theme-color"]');
    const defaultThemeColor = themeMetaTag.getAttribute('data-default-color');

    // Función para establecer el tema
    const setTheme = (isLightMode) => {
        if (isLightMode) {
            body.classList.add('light-mode'); // Añade la clase 'light-mode' al body
            
            // Cambia el icono del botón
            themeToggleButton.querySelector('.fa-solid').classList.remove('fa-toggle-on');
            themeToggleButton.querySelector('.fa-solid').classList.add('fa-toggle-off');
            
            // Actualiza el color de la meta etiqueta para el modo claro
            themeMetaTag.setAttribute('content', '#B0DAFF');
        } else {
            body.classList.remove('light-mode'); // Elimina la clase 'light-mode' del body
            
            // Cambia el icono del botón
            themeToggleButton.querySelector('.fa-solid').classList.remove('fa-toggle-off');
            themeToggleButton.querySelector('.fa-solid').classList.add('fa-toggle-on');
            
            // Restaura el color por defecto de la meta etiqueta
            themeMetaTag.setAttribute('content', defaultThemeColor);
        }
        // Nota: Las clases nav-main-a e img-card-a ya no son necesarias para aplicar en JS.
        // Los estilos se aplican directamente a .nav-main y .img-card cuando body.light-mode está activo.
    };

    // Comprobar la preferencia de tema guardada en localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        setTheme(true);
    } else {
        setTheme(false);
    }

    themeToggleButton.addEventListener('click', () => {
        const isLightMode = body.classList.contains('light-mode');
        setTheme(!isLightMode);
        localStorage.setItem('theme', !isLightMode ? 'light' : 'dark');
    });
});