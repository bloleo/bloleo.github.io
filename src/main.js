import './style.css';

const mailbox = document.getElementById("mailbox");
const sceneMail = document.getElementById("scene-mail");
const sceneLetter = document.getElementById("scene-letter");
const nextLineBtn = document.getElementById("next-line-btn");
const nextButtonContainer = document.getElementById("next-button-container");

let currentLineIndex = 0;
let lines = [];
let isCounting = false;
const TARGET_DISTANCE = 9515.7;

mailbox.addEventListener("click", () => {
  mailbox.style.transform = 'scale(0.9) rotate(-10deg)';
  mailbox.style.transition = 'all 0.3s ease';

  sceneMail.classList.add("scene--fade-out");

  setTimeout(() => {
    sceneMail.classList.remove("scene--active");
    sceneLetter.classList.add("scene--active", "scene--fade-in");

    // Inicializar las líneas después de que aparezca la escena
    setTimeout(() => {
      lines = document.querySelectorAll('.seq-line');
      currentLineIndex = 0;
      
      // Mostrar el botón después de un breve momento
      setTimeout(() => {
        nextButtonContainer.classList.add('opacity-100');
        nextButtonContainer.classList.remove('opacity-0');
      }, 500);
    }, 100);
  }, 1000);
});

// Función para animar el contador de distancia
function animateDistanceCounter() {
  const distanceElement = document.getElementById('distance-number');
  if (!distanceElement) return;
  
  let currentDistance = 0;
  const duration = 2000; // 2 segundos para llegar al valor final
  const increment = TARGET_DISTANCE / (duration / 16); // 60fps
  
  const timer = setInterval(() => {
    currentDistance += increment;
    
    if (currentDistance >= TARGET_DISTANCE) {
      currentDistance = TARGET_DISTANCE;
      clearInterval(timer);
      isCounting = false;
      
      // Formatear con separador de miles y decimal
      distanceElement.textContent = currentDistance.toLocaleString('es-ES', {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1
      });
    } else {
      // Mostrar número entero mientras cuenta (para mejor performance)
      distanceElement.textContent = Math.floor(currentDistance).toLocaleString('es-ES');
    }
  }, 16); // ~60fps
}

// Función para mostrar la siguiente línea
function showNextLine() {
  if (currentLineIndex >= lines.length) {
    // Si ya no hay más líneas, ocultar el botón o cambiar su texto
    nextLineBtn.textContent = "¡Fin del mensaje!";
    nextLineBtn.disabled = true;
    nextLineBtn.classList.add('opacity-50', 'cursor-not-allowed');
    return;
  }

  // Obtener la línea actual
  const currentLine = lines[currentLineIndex];
  
  // Si esta línea es el contador de distancia, iniciar animación
  if (currentLine.classList.contains('distance-counter-container') && !isCounting) {
    isCounting = true;
    
    // Mostrar el contador primero
    currentLine.classList.add('is-visible');
    
    // Iniciar animación después de un pequeño delay
    setTimeout(() => {
      animateDistanceCounter();
    }, 300);
    
    // No incrementar el índice todavía - el usuario debe hacer clic otra vez
    // para continuar después de ver la animación
    currentLineIndex++;
    
    // Cambiar texto del botón temporalmente
    const originalText = nextLineBtn.textContent;
    nextLineBtn.textContent = "Contando distancia...";
    nextLineBtn.disabled = true;
    
    // Rehabilitar el botón después de que termine la animación
    setTimeout(() => {
      nextLineBtn.disabled = false;
      nextLineBtn.textContent = "Continuar →";
    }, 2100); // Un poco más que la duración de la animación
    
    return;
  }

  // Mostrar la línea actual normalmente
  currentLine.classList.add('is-visible');
  currentLineIndex++;

  // Restaurar texto del botón si estaba en "Continuar"
  if (nextLineBtn.textContent === "Continuar →") {
    nextLineBtn.textContent = currentLineIndex >= lines.length ? "¡Fin! ❤️" : "Siguiente línea →";
  }

  // Si es la última línea, cambiar el texto del botón
  if (currentLineIndex === lines.length) {
    nextLineBtn.textContent = "¡Fin! ❤️";
  }
}

// Evento para el botón
nextLineBtn.addEventListener("click", showNextLine);

// También soporte con tecla Enter
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    if (sceneMail.classList.contains('scene--active')) {
      // Si estamos en la primera escena, hacer clic en el buzón
      mailbox.click();
    } else if (sceneLetter.classList.contains('scene--active') && !nextLineBtn.disabled) {
      // Si estamos en la segunda escena, avanzar línea
      showNextLine();
    }
  }
});

// También soporte con tecla de espacio
document.addEventListener('keydown', (e) => {
  if (e.key === ' ' && sceneLetter.classList.contains('scene--active') && !nextLineBtn.disabled) {
    e.preventDefault(); // Prevenir que la página haga scroll
    showNextLine();
  }
});