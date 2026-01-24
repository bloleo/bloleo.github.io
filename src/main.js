import './style.css';

const mailbox = document.getElementById("mailbox");
const sceneMail = document.getElementById("scene-mail");
const sceneLetter = document.getElementById("scene-letter");
const nextLineBtn = document.getElementById("next-line-btn");
const nextButtonContainer = document.getElementById("next-button-container");
const scene3 = document.getElementById("scene-3");

let currentLineIndex = 0;
let lines = [];
let isCounting = false;
const TARGET_DISTANCE = 9515.7;
let isEndOfMessage = false;


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
// Función para mostrar la siguiente línea
function showNextLine() {
  if (currentLineIndex >= lines.length) {
    isEndOfMessage = true;
    // Change button to indicate final action
    nextLineBtn.textContent = "Continuar →";
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
    
    // Incrementar el índice
    currentLineIndex++;
    
    // Cambiar texto del botón temporalmente
    nextLineBtn.textContent = "Contando distancia...";
    nextLineBtn.disabled = true;
    
    // Rehabilitar el botón después de que termine la animación
    setTimeout(() => {
      nextLineBtn.disabled = false;
      
      // Check if this was the last line
      if (currentLineIndex >= lines.length) {
        isEndOfMessage = true;
        nextLineBtn.textContent = "Continuar →";
      } else {
        nextLineBtn.textContent = "Siguiente línea →";
      }
    }, 2100);
    
    return;
  }

  // Mostrar la línea actual normalmente
  currentLine.classList.add('is-visible');
  currentLineIndex++;

  // Si es la última línea, marcar fin del mensaje
  if (currentLineIndex >= lines.length) {
    isEndOfMessage = true;
    nextLineBtn.textContent = "Continuar →";
  } else {
    nextLineBtn.textContent = "Siguiente línea →";
  }
}

// Evento para el botón
nextLineBtn.addEventListener("click", () => {
  if (isEndOfMessage) {
    // Clean animation state
    sceneLetter.classList.remove("scene--fade-in");
    void sceneLetter.offsetWidth;

    // Fade out Scene 2
    sceneLetter.classList.add("scene--fade-out");

    setTimeout(() => {
      sceneLetter.classList.remove("scene--active", "scene--fade-out");

      // Prepare Scene 3
      scene3.classList.remove("scene--fade-out");
      void scene3.offsetWidth;

      scene3.classList.add("scene--active", "scene--fade-in");

      // IMPORTANT: init Scene 3 ONLY NOW
      setTimeout(() => {
        initScene3();
      }, 600);

    }, 1200);
  } else {
    showNextLine();
  }
});


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

/* 
 ESCENA 3 
*/
// Variables para la escena 3
let scene3Items = [];
let currentScene3Index = 0;
let correctDays = 0;
let isScene3Finished = false;

// Función para calcular días desde la primera cita
function calculateDaysSinceFirstDate() {
  const firstDate = new Date('2024-11-19');
  const today = new Date();
  const timeDiff = today.getTime() - firstDate.getTime();
  const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
  return daysDiff;
}

// Función para generar opciones de adivinanza
function generateDayOptions() {
  correctDays = calculateDaysSinceFirstDate();
  
  // Generar 2 números incorrectos cerca del correcto
  const options = [correctDays];
  
  // Asegurarse de que los números incorrectos sean diferentes
  let option1, option2;
  do {
    option1 = correctDays + Math.floor(Math.random() * 10) - 5; // +/- 5 días
    option1 = Math.max(1, option1); // No permitir números negativos
  } while (option1 === correctDays || options.includes(option1));
  
  do {
    option2 = correctDays + Math.floor(Math.random() * 15) - 7; // +/- 7 días
    option2 = Math.max(1, option2);
  } while (option2 === correctDays || options.includes(option2));
  
  options.push(option1, option2);
  
  // Mezclar las opciones
  options.sort(() => Math.random() - 0.5);
  
  // Actualizar los botones
  const buttons = document.querySelectorAll('.guess-btn span');
  buttons.forEach((btn, index) => {
    btn.textContent = options[index];
    btn.parentElement.dataset.days = options[index];
  });
  
  return options;
}

// Función para manejar la adivinanza de días
function setupGuessButtons() {
  const guessButtons = document.querySelectorAll('.guess-btn');
  const correctMessage = document.getElementById('correct-message');
  const incorrectMessage = document.getElementById('incorrect-message');
  const feedbackDiv = document.getElementById('guess-feedback');
  const correctDaysSpan = document.getElementById('correct-days');
  
  guessButtons.forEach(button => {
    button.addEventListener('click', () => {
      const selectedDays = parseInt(button.dataset.days);
      
      if (selectedDays === correctDays) {
        // Respuesta correcta
        correctDaysSpan.textContent = correctDays;
        correctMessage.classList.remove('hidden');
        incorrectMessage.classList.add('hidden');
        feedbackDiv.classList.remove('opacity-0');
        feedbackDiv.classList.add('opacity-100');
        
        // Deshabilitar todos los botones
        guessButtons.forEach(btn => {
          btn.disabled = true;
          btn.classList.remove('hover:bg-amber-200', 'hover:scale-105');
          btn.classList.add('opacity-50');
        });
        
        // Resaltar el botón correcto
        button.classList.remove('bg-amber-100', 'border-amber-300');
        button.classList.add('bg-green-100', 'border-green-400');
        
        // Mostrar siguiente secuencia después de un delay
        setTimeout(() => {
          showNextScene3Item();
        }, 1500);
        
      } else {
        // Respuesta incorrecta
        correctMessage.classList.add('hidden');
        incorrectMessage.classList.remove('hidden');
        feedbackDiv.classList.remove('opacity-0');
        feedbackDiv.classList.add('opacity-100');
        
        // Dar feedback visual al botón incorrecto
        button.classList.remove('bg-amber-100');
        button.classList.add('bg-red-100', 'border-red-300');
        
        // Resetear después de un tiempo
        setTimeout(() => {
          button.classList.remove('bg-red-100', 'border-red-300');
          button.classList.add('bg-amber-100', 'border-amber-300');
        }, 1000);
      }
    });
  });
}

// Función para mostrar siguiente ítem en escena 3
function showNextScene3Item() {
  if (currentScene3Index >= scene3Items.length) {
    isScene3Finished = true;
    return;
  }

  const item = scene3Items[currentScene3Index];
  item.classList.add('is-visible');
  item.style.opacity = '1';
  item.style.transform = 'translateY(0)';

  currentScene3Index++;
}

// Función para inicializar la escena 3
function initScene3() {
  scene3Items = document.querySelectorAll('#scene-3 .seq-item');
  currentScene3Index = 0;
  isScene3Finished = false;

  scene3Items.forEach(item => {
    item.classList.remove('is-visible');
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
  });

  generateDayOptions();
  setupGuessButtons();

  // Reveal first item
  setTimeout(() => {
    showNextScene3Item();
  }, 600);
}



// Agregar evento para el botón de continuar en scene 3
document.addEventListener('DOMContentLoaded', () => {
  // Esto se ejecutará cuando el DOM esté cargado
  const scene3ContinueBtn = document.getElementById('scene3-continue-btn');
  if (scene3ContinueBtn) {
    scene3ContinueBtn.addEventListener('click', () => {
      if (isScene3Finished) {
        // Aquí puedes agregar la transición a la siguiente escena
        alert('¡Próxima escena! (puedes agregar más escenas aquí)');
      } else {
        showNextScene3Item();
      }
    });
  }
});

// También agregar soporte para teclas en scene 3
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    if (scene3.classList.contains('scene--active') && !isScene3Finished) {
      e.preventDefault();
      showNextScene3Item();
    }
  }
});