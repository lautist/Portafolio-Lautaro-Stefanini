// Seleccionar todos los elementos que se animarán
let animatedElements = document.querySelectorAll('.animated');

// Función que se activa cuando el usuario desplaza hacia abajo
function checkScroll() {
  // Obtener la posición actual del scroll
  let scrollPosition = window.innerHeight + window.scrollY;

  // Iterar por cada elemento animado y agregar la clase 'fadeIn' si está dentro del viewport
  for (let i = 0; i < animatedElements.length; i++) {
    let element = animatedElements[i];
    if (scrollPosition > element.offsetTop) {
      element.classList.add('fadeIn');
    }
  }
}

// Detectar cuando el usuario desplaza hacia abajo en la página y llamar a la función checkScroll
window.addEventListener('scroll', checkScroll);

document.getElementById("cambiar-color").addEventListener("click", function() {
    document.querySelectorAll('*').forEach(function(element) {
        element.classList.toggle('cambio-color');
      });
      const progressBars = document.querySelectorAll('.label');

  // Toggle entre las dos clases de color para cada barra de progreso
  progressBars.forEach((progressBar) => {
    progressBar.classList.toggle('progress-color');
  });

  document.querySelector('meta[name="theme-color"]').setAttribute('content', '#B0DAFF');

    const imgColor = document.querySelectorAll('#imgccA, #imgccB, #imgccC, #imgccD');
    const navColor = document.getElementById('nav-main-color');

    navColor.classList.toggle('nav-main');
    navColor.classList.toggle('nav-main-a');

  
    imgColor.forEach(function(element) {
      element.classList.toggle('img-card');
      element.classList.toggle('img-card-a');
    });
    
  });