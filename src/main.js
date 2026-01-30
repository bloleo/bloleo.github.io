import './style.css';

const fotosGraduacion = [
  'recibida-mia.jpeg', 
  'recibida-mate.jpeg'
];

const fotosSiestas = [
  'nap/1.jpeg',
  'nap/2.jpeg',
  'nap/3.jpeg',
  'nap/4.jpeg'
];

const fotosFood = [
  'food/1.jpeg', 'food/2.jpeg', 'food/3.jpeg', 'food/4.jpeg',
  'food/5.jpeg', 'food/6.jpeg', 'food/7.jpeg', 'food/9.jpeg'
];

window.misFotosDeViaje = [
  'mendoza/airport.jpeg',
  'mendoza/giaquinta.jpeg',
  'mendoza/me-vinito.jpeg',
  'mendoza/us-almuerzo.jpeg',
  'mendoza/you-vinito.jpeg',
  'mendoza/resting-aconcagua.jpeg',
  'mendoza/viniedo-mountains.jpeg',
  'mendoza/laguna-aconcagua.jpeg',
  'mendoza/birdie2-aconcagua.jpeg',
  'mendoza/us-aconcagua2.jpeg',
  'mendoza/parque-san-martin.jpeg',
  'mendoza/mendoza-7.jpg',
  'mendoza/mendoza-2.jpg', 
  'mendoza/mendoza-8.jpg',
  'mendoza/mendoza-1.jpg', 
  'mendoza/mendoza-6.jpg',
  'mendoza/mendoza-5.jpg',
  'mendoza/mendoza-3.jpg',
  'mendoza/mendoza-4.jpg',
  'mendoza/kiss-aconcagua.jpeg',
  'mendoza/us-aconcagua.jpeg',
];
window.currentTravelPhoto = 0;

const fotosMoviesSeries = [
  'movie_prisoners.jpg', 
  'movie_interstellar.jpg', 
  'movie_crepusculo.jpg',
  'movie_flow.jpg',
  'movie_nocturnal_animals.jfif', 
  'movie_MI.jfif', 
  'movie_nightcrawler.jpg',
  'movie_doubt.jpg',
  'movie_magnolia.png',
  'movie_manchester.jpg',
  'movie_ripley.jpeg',
  'serie_mindhunter.jpg',
  'serie_severance.jpg',
  'serie_true_detective.jfif',
  'serie_hannibal.jpg',
  'serie_pluribus.jfif',
];

const fotosGames = [
  'it-takes2.jpg', 
  'bokura.png', 
  'AC2.jfif', 
]

window.fotosRecuerdos = [
  'varias/first-official-date.jpeg',
  'varias/first-selfie.jpeg', 
  'varias/bucito.jpeg',
  'varias/las-heras.jpeg',
  'varias/us-time.jpeg',
  'varias/ultima-materia.jpeg',
  'varias/rio-cuarto-vuelta.jpeg',
  'varias/concurso.jpeg',
  'varias/chic.jpeg',
  'varias/chefcito.jpeg',
  'varias/bday.jpeg',
  'varias/last-day.jpeg',
  'varias/placita.jpeg',
  'varias/coffee-post-gun-museum.jpeg',
  'varias/eepyhead.jpeg',
  'varias/silksong.jpeg',
  'varias/backroom.jpeg',
  'varias/areco-coffee.jpeg',
  'varias/rio.jpeg',
  'varias/nap.jpeg',
  'varias/san-telmo.jpeg',
  'varias/kiss.jpeg',
  'varias/candy.jpeg',
  'varias/shared-time.jpeg',
  'varias/tarde-placita.jpeg',
  'varias/us.jpeg',
];
window.currentRecuerdoPhoto = 0;

// ========================================
// SCENE MANAGER
// ========================================
class SceneManager {
  constructor() {
    this.currentSceneId = null;
    this.scenes = new Map();
  }

  registerScene(id, config) {
    this.scenes.set(id, {
      element: document.getElementById(id),
      onEnter: config.onEnter || null,
      onExit: config.onExit || null,
    });
  }

  transitionTo(nextSceneId, delay = 1000) {
    const currentScene = this.scenes.get(this.currentSceneId);
    const nextScene = this.scenes.get(nextSceneId);

    if (!nextScene) {
      console.error(`Scene ${nextSceneId} not found`);
      return;
    }

    if (currentScene) {
      if (currentScene.onExit) currentScene.onExit();
      
      currentScene.element.classList.remove("scene--fade-in");
      void currentScene.element.offsetWidth;
      currentScene.element.classList.add("scene--fade-out");

      setTimeout(() => {
        currentScene.element.classList.remove("scene--active", "scene--fade-out");
      }, delay);
    }

    setTimeout(() => {
      nextScene.element.classList.remove("scene--fade-out");
      void nextScene.element.offsetWidth;
      nextScene.element.classList.add("scene--active", "scene--fade-in");

      this.currentSceneId = nextSceneId;

      setTimeout(() => {
        if (nextScene.onEnter) nextScene.onEnter();
      }, 600);
    }, currentScene ? delay : 0);
  }

  getCurrentSceneId() {
    return this.currentSceneId;
  }
}

const sceneManager = new SceneManager();

// ========================================
// SCENE 1: MAILBOX
// ========================================
const mailbox = document.getElementById("mailbox");
const music = document.getElementById("bg-music");
let isMusicPlaying = false;

sceneManager.registerScene('scene-mail', {
  onEnter: () => {
    // Scene is active on load
  }
});

mailbox.addEventListener("click", () => {
  if (music && !isMusicPlaying) {
    fadeInAudio(music);
    isMusicPlaying = true;
    setTimeout(() => {
      const musicControls = document.getElementById('music-controls');
      if (musicControls) {
        musicControls.classList.remove('opacity-0');
        musicControls.classList.add('opacity-100');
      }
    }, 1000);
  }

  mailbox.style.transform = 'scale(0.9) rotate(-10deg)';
  mailbox.style.transition = 'all 0.3s ease';
  sceneManager.transitionTo('scene-letter');
});

function fadeInAudio(audioElement) {
  audioElement.volume = 0;
  audioElement.play();
  let vol = 0;
  const targetVol = 0.3;
  const interval = setInterval(() => {
    if (vol < targetVol) {
      vol += 0.03;
      audioElement.volume = Math.min(vol, targetVol);
    } else {
      clearInterval(interval);
    }
  }, 200);
}

function setupMusicControls() {
  const playPauseBtn = document.getElementById('play-pause-btn');
  const volumeSlider = document.getElementById('volume-slider');
  const volumeIcon = document.getElementById('volume-icon');
  
  if (playPauseBtn) {
    playPauseBtn.addEventListener('click', () => {
      if (music.paused) {
        music.play();
        playPauseBtn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
          </svg>
        `;
      } else {
        music.pause();
        playPauseBtn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
        `;
      }
    });
  }
  
  if (volumeSlider) {
    volumeSlider.addEventListener('input', (e) => {
      const sliderValue = e.target.value / 100;
      // Convertir a escala logarítmica para una percepción más natural
      const volume = Math.pow(sliderValue, 2);
      music.volume = volume;
      
      if (volume === 0) {
        volumeIcon.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
          </svg>
        `;
      } else if (volume < 0.25) {
        volumeIcon.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 9v6h4l5 5V4l-5 5H7z"/>
          </svg>
        `;
      } else {
        volumeIcon.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
          </svg>
        `;
      }
    });
    
    // Configurar volumen inicial (55% en el slider = ~30% real)
    volumeSlider.value = 55;
  }
}

// ========================================
// SCENE 2: LETTER
// ========================================
const nextLineBtn = document.getElementById("next-line-btn");
const nextButtonContainer = document.getElementById("next-button-container");

let currentLineIndex = 0;
let lines = [];
let isCounting = false;
const TARGET_DISTANCE = 9515.7;
let isEndOfMessage = false;

sceneManager.registerScene('scene-letter', {
  onEnter: () => {
    lines = document.querySelectorAll('.seq-line');
    currentLineIndex = 0;
    isEndOfMessage = false;
    
    setTimeout(() => {
      nextButtonContainer.classList.add('opacity-100');
      nextButtonContainer.classList.remove('opacity-0');
    }, 500);
  }
});

function animateDistanceCounter() {
  const distanceElement = document.getElementById('distance-number');
  if (!distanceElement) return;
  
  let currentDistance = 0;
  const duration = 2000;
  const increment = TARGET_DISTANCE / (duration / 16);
  
  const timer = setInterval(() => {
    currentDistance += increment;
    
    if (currentDistance >= TARGET_DISTANCE) {
      currentDistance = TARGET_DISTANCE;
      clearInterval(timer);
      isCounting = false;
      
      distanceElement.textContent = currentDistance.toLocaleString('es-ES', {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1
      });
    } else {
      distanceElement.textContent = Math.floor(currentDistance).toLocaleString('es-ES');
    }
  }, 16);
}

function showNextLine() {
  if (currentLineIndex >= lines.length) {
    isEndOfMessage = true;
    nextLineBtn.textContent = "Continuar →";
    return;
  }

  const currentLine = lines[currentLineIndex];
  
  if (currentLine.classList.contains('distance-counter-container') && !isCounting) {
    isCounting = true;
    currentLine.classList.add('is-visible');
    
    setTimeout(() => {
      animateDistanceCounter();
    }, 300);
    
    currentLineIndex++;
    nextLineBtn.textContent = "Contando distancia...";
    nextLineBtn.disabled = true;
    
    setTimeout(() => {
      nextLineBtn.disabled = false;
      
      if (currentLineIndex >= lines.length) {
        isEndOfMessage = true;
        nextLineBtn.textContent = "Continuar →";
      } else {
        nextLineBtn.textContent = "Siguiente línea →";
      }
    }, 2100);
    
    return;
  }

  currentLine.classList.add('is-visible');
  currentLineIndex++;

  if (currentLineIndex >= lines.length) {
    isEndOfMessage = true;
    nextLineBtn.textContent = "Continuar →";
  } else {
    nextLineBtn.textContent = "Siguiente línea →";
  }
}

nextLineBtn.addEventListener("click", () => {
  if (isEndOfMessage) {
    sceneManager.transitionTo('scene-3', 1200);
  } else {
    showNextLine();
  }
});

// ========================================
// SCENE 3: POP QUIZ
// ========================================
let correctDays = 0;

sceneManager.registerScene('scene-3', {
  onEnter: () => {
    initPopQuiz();
  }
});

function calculateDaysSinceFirstDate() {
  const firstDate = new Date('2024-11-29');
  const today = new Date();
  const timeDiff = today.getTime() - firstDate.getTime();
  const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
  return daysDiff;
}

function generateDayOptions() {
  correctDays = calculateDaysSinceFirstDate();
  const options = [correctDays];
  
  let option1, option2;
  do {
    option1 = correctDays + Math.floor(Math.random() * 10) - 5;
    option1 = Math.max(1, option1);
  } while (option1 === correctDays || options.includes(option1));
  
  do {
    option2 = correctDays + Math.floor(Math.random() * 15) - 7;
    option2 = Math.max(1, option2);
  } while (option2 === correctDays || options.includes(option2));
  
  options.push(option1, option2);
  options.sort(() => Math.random() - 0.5);
  
  const buttons = document.querySelectorAll('.guess-btn span');
  buttons.forEach((btn, index) => {
    btn.textContent = options[index];
    btn.parentElement.dataset.days = options[index];
  });
  
  return options;
}

function setupGuessButtons() {
  const guessButtons = document.querySelectorAll('.guess-btn');
  const correctMessage = document.getElementById('correct-message');
  const incorrectMessage = document.getElementById('incorrect-message');
  const feedbackDiv = document.getElementById('guess-feedback');
  
  guessButtons.forEach(button => {
    const newButton = button.cloneNode(true);
    button.parentNode.replaceChild(newButton, button);
  });
  
  document.querySelectorAll('.guess-btn').forEach(button => {
    button.addEventListener('click', () => {
      const selectedDays = parseInt(button.dataset.days);
      
      if (selectedDays === correctDays) {
        correctMessage.classList.remove('hidden');
        incorrectMessage.classList.add('hidden');
        feedbackDiv.classList.remove('opacity-0');
        feedbackDiv.classList.add('opacity-100');
        
        document.querySelectorAll('.guess-btn').forEach(btn => {
          btn.disabled = true;
          btn.classList.remove('hover:bg-rose-200', 'hover:scale-105');
          btn.classList.add('opacity-50');
        });
        
        button.classList.remove('bg-rose-100', 'border-rose-300');
        button.classList.add('bg-green-100', 'border-green-400');
        
        setTimeout(() => {
          sceneManager.transitionTo('scene-4');
        }, 2000);
        
      } else {
        correctMessage.classList.add('hidden');
        incorrectMessage.classList.remove('hidden');
        feedbackDiv.classList.remove('opacity-0');
        feedbackDiv.classList.add('opacity-100');
        
        button.classList.remove('bg-rose-100');
        button.classList.add('bg-red-100', 'border-red-300');
        
        setTimeout(() => {
          button.classList.remove('bg-red-100', 'border-red-300');
          button.classList.add('bg-rose-100', 'border-rose-300');
          feedbackDiv.classList.add('opacity-0');
          feedbackDiv.classList.remove('opacity-100');
        }, 1000);
      }
    });
  });
}

function initPopQuiz() {
  generateDayOptions();
  setupGuessButtons();
  
  const feedbackDiv = document.getElementById('guess-feedback');
  feedbackDiv.classList.add('opacity-0');
  feedbackDiv.classList.remove('opacity-100');
  
  document.querySelectorAll('.guess-btn').forEach(btn => {
    btn.disabled = false;
    btn.classList.add('hover:bg-rose-200', 'hover:scale-105');
    btn.classList.remove('opacity-50', 'bg-green-100', 'border-green-400', 'bg-red-100', 'border-red-300');
    btn.classList.add('bg-rose-100', 'border-rose-300');
  });
}

// ========================================
// SCENE 4: CAROUSEL
// ========================================
let currentSlideIndex = 0;
let carouselSlides = [];

sceneManager.registerScene('scene-4', {
  onEnter: () => {
    initCarousel();
  }
});

function createSlides() {
  return [
    {
      id: 'slide-te-amo',
      render: () => `
        <div class="text-center flex flex-col items-center justify-center">
          <p class="text-xl md:text-2xl text-amber-900 mb-6 font-caveat">Intercambiamos por chat un aproximado de</p>
          
          <p class="text-7xl md:text-8xl font-bold font-caveat text-rose-500 mb-8">
            <span id="te-amo-counter">0</span>
          </p>
          
          <div class="relative bg-[#25D366] font-caveat text-white px-6 py-3 rounded-2xl rounded-tr-none shadow-lg flex items-center gap-2">
            <span class="font-bold tracking-wide">Te amo</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
            </svg>
            
            <div class="absolute -top-0 -right-2 w-0 h-0 border-t-[10px] border-t-[#25D366] border-r-[10px] border-r-transparent"></div>
          </div>
        </div>
      `,
      onEnter: () => {
        animateTeAmoCounter();
      }
    },
    
    {
      id: 'slide-peliculas',
      render: () => `
        <div class="text-center w-full max-w-2xl mx-auto">
          <h2 class="text-3xl md:text-4xl font-caveat mb-6 text-amber-900 leading-none">Vimos unas cuantas pelis y series</h2>
          
          <div class="grid grid-cols-4 md:grid-cols-8 gap-1.5 px-2">
            ${fotosMoviesSeries.map((foto) => `
              <div class="aspect-[2/3] bg-neutral-200 rounded shadow-sm overflow-hidden border border-white hover:scale-110 transition duration-300">
                <img src="/movie/${foto}" class="w-full h-full object-cover" alt="Poster">
              </div>
            `).join('')}
          </div>
        </div>
      `
    },

    {
      id: 'slide-food',
      render: () => `
        <div class="text-center w-full max-w-4xl mx-auto px-2 flex flex-col justify-center min-h-full">
          <p class="text-2xl md:text-3xl mb-4 font-caveat text-amber-900">Me cocinaste comidita muy rica</p>
          
          <div class="grid grid-cols-2 md:grid-cols-4 gap-x-2 md:gap-x-3 gap-y-4 justify-items-center items-center py-2">
            ${fotosFood.map((foto, index) => {
              const rotation = (index % 2 === 0 ? '-' : '') + (Math.floor(Math.random() * 6) + 2);
              return `
                <div onclick="window.openLightbox(${index}, fotosFood)" 
                    class="cursor-zoom-in bg-white p-1 shadow-lg transform rotate-[${rotation}deg] hover:rotate-0 hover:scale-105 transition duration-300 w-28 h-28 md:w-32 md:h-32 flex-shrink-0">
                  <img src="/${foto}" class="w-full h-full object-cover border border-neutral-100">
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `
    },
    
    {
      id: 'slide-graduacion',
      render: () => `
        <div class="text-center w-full max-w-2xl mx-auto px-4">
          <p class="text-3xl md:text-4xl mb-8 font-caveat text-amber-900">¡Nos recibimos!</p>
          
          <div class="flex flex-col md:flex-row justify-center items-center gap-6">
            <div onclick="window.openLightbox(0, fotosGraduacion)" 
                 class="cursor-zoom-in bg-green-100 rounded-xl overflow-hidden shadow-xl border-4 border-white transform -rotate-2 hover:rotate-0 transition duration-300 w-full max-w-[280px]">
              <img src="${fotosGraduacion[0]}" class="w-full h-64 object-cover">
            </div>
            
            <div onclick="window.openLightbox(1, fotosGraduacion)" 
                 class="cursor-zoom-in bg-green-100 rounded-xl overflow-hidden shadow-xl border-4 border-white transform rotate-2 hover:rotate-0 transition duration-300 w-full max-w-[280px]">
              <img src="${fotosGraduacion[1]}" class="w-full h-64 object-cover">
            </div>
          </div>
        </div>
      `
    },
    
    {
      id: 'slide-viaje',
      render: () => `
        <div class="text-center flex flex-col items-center w-full">
          <h2 class="text-3xl md:text-4xl font-caveat mb-6 text-amber-900">Compartimos nuestro primer viaje</h2>
          
          <div class="flex items-center justify-center gap-2 w-full max-w-lg">
            <button id="travel-prev" class="w-10 h-10 flex items-center justify-center transition hover:scale-110 active:scale-90">
              <img src="/wine.png" alt="Prev" class="w-full h-full transform rotate-180">
            </button>
            
            <div id="travel-photo-container" 
                class="cursor-zoom-in bg-blue-100 rounded-xl h-72 md:h-80 flex-1 shadow-lg overflow-hidden border-4 border-white">
              <img id="travel-photo-display" src="${window.misFotosDeViaje[window.currentTravelPhoto]}" class="w-full h-full object-cover">
            </div>

            <button id="travel-next" class="w-10 h-10 flex items-center justify-center transition hover:scale-110 active:scale-90">
              <img src="/wine.png" alt="Next" class="w-full h-full">
            </button>
          </div>
        </div>
      `,
      onEnter: () => {
        setupTravelCarousel();
      }
    },

    {
      id: 'slide-siestas',
      render: () => `
        <div class="text-center w-full max-w-4xl mx-auto px-2">
          <p class="text-2xl md:text-3xl text-neutral-700 mb-10 font-caveat font-bold">Dormimos varias siestitas</p>
          
          <div class="flex flex-row flex-wrap justify-center items-center gap-2 md:gap-4 py-4">
            <div onclick="window.openLightbox(0, fotosSiestas)" 
                class="cursor-zoom-in bg-white p-1.5 shadow-xl transform -rotate-12 hover:rotate-0 transition duration-300 w-32 h-32 md:w-44 md:h-44 flex-shrink-0">
              <img src="/nap/1.jpeg" class="w-full h-full object-cover">
            </div>
            
            <div onclick="window.openLightbox(1, fotosSiestas)" 
                class="cursor-zoom-in bg-white p-1.5 shadow-xl transform rotate-6 hover:rotate-0 transition duration-300 w-32 h-32 md:w-44 md:h-44 flex-shrink-0 -mt-8">
              <img src="/nap/2.jpeg" class="w-full h-full object-cover">
            </div>
            
            <div onclick="window.openLightbox(2, fotosSiestas)" 
                class="cursor-zoom-in bg-white p-1.5 shadow-xl transform -rotate-3 hover:rotate-0 transition duration-300 w-32 h-32 md:w-44 md:h-44 flex-shrink-0 mt-4">
              <img src="/nap/3.jpeg" class="w-full h-full object-cover">
            </div>
            
            <div onclick="window.openLightbox(3, fotosSiestas)" 
                class="cursor-zoom-in bg-white p-1.5 shadow-xl transform rotate-12 hover:rotate-0 transition duration-300 w-32 h-32 md:w-44 md:h-44 flex-shrink-0 -mt-4">
              <img src="/nap/4.jpeg" class="w-full h-full object-cover">
            </div>
          </div>
        </div>
      `
    },
    
    {
      id: 'slide-games',
      render: () => `
        <div class="text-center w-full max-w-xl mx-auto">
          <h2 class="text-3xl md:text-4xl font-caveat mb-6 text-amber-900 leading-none">Exploramos algunos juegos</h2>
          
          <div class="grid grid-cols-4 md:grid-cols-3 gap-1.5 px-2">
            ${fotosGames.map((foto) => `
              <div class="aspect-1 bg-neutral-200 rounded shadow-sm overflow-hidden border border-white hover:scale-110 transition duration-300">
                <img src="/game/${foto}" class="w-full h-full object-cover" alt="Poster">
              </div>
            `).join('')}
          </div>
          <p class="text-sm font-caveat text-rose-900">(It takes 2 and AC2 cry in abandoned)</p>
        </div>
      `
    },
    
    {
      id: 'slide-fotos',
      render: () => `
        <div class="text-center flex flex-col items-center justify-center w-full">
          <p class="text-3xl md:text-4xl font-caveat text-amber-900 mb-6">Y generamos muchos recuerdos 📸</p>
          
          <div class="flex items-center justify-center gap-2 w-full max-w-sm">
            <button id="photo-prev" class="w-12 h-12 flex items-center justify-center transition hover:scale-110 active:scale-90">
              <img src="/bcs-mug.png" alt="Prev" 
                  class="w-full h-full object-contain transform">
            </button>

            <div id="photo-container" class="cursor-zoom-in bg-yellow-100 rounded-xl h-72 md:h-80 flex-1 shadow-xl flex items-center justify-center overflow-hidden border-4 border-white">
                <img id="carousel-photo-display" src="${window.fotosRecuerdos[window.currentRecuerdoPhoto]}" class="w-full h-full object-cover">
            </div>

            <button id="photo-next" class="w-12 h-12 flex items-center justify-center transition hover:scale-110 active:scale-90">
              <img src="/bcs-mug.png" alt="Next" class="w-full h-full object-contain transform">
            </button>
          </div>
          
          <p id="photo-caption" class="text-base text-neutral-600 italic mt-4 font-caveat">Nuestros recuerdos juntos</p>
        </div>
      `,
      onEnter: () => {
        setupPhotoCarousel();
      }
    }
  ];
}

function setupTravelCarousel() {
  if (window.currentTravelPhoto === undefined) window.currentTravelPhoto = 0;
  
  const imgDisplay = document.getElementById('travel-photo-display');
  const imgContainer = document.getElementById('travel-photo-container');
  const prevBtn = document.getElementById('travel-prev');
  const nextBtn = document.getElementById('travel-next');

  if (imgContainer) {
    imgContainer.onclick = () => {
      window.openLightbox(window.currentTravelPhoto, window.misFotosDeViaje);
    };
  }

  if (prevBtn && nextBtn) {
    prevBtn.onclick = (e) => {
      e.stopPropagation();
      window.currentTravelPhoto = (window.currentTravelPhoto - 1 + window.misFotosDeViaje.length) % window.misFotosDeViaje.length;
      imgDisplay.src = window.misFotosDeViaje[window.currentTravelPhoto];
    };
    
    nextBtn.onclick = (e) => {
      e.stopPropagation();
      window.currentTravelPhoto = (window.currentTravelPhoto + 1) % window.misFotosDeViaje.length;
      imgDisplay.src = window.misFotosDeViaje[window.currentTravelPhoto];
    };
  }
}

function animateTeAmoCounter() {
  const counter = document.getElementById('te-amo-counter');
  if (!counter) return;
  
  let current = 0;
  const target = 215;
  const duration = 2000;
  const increment = target / (duration / 16);
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    counter.textContent = Math.floor(current);
  }, 16);
}

function setupPhotoCarousel() {
  if (window.currentRecuerdoPhoto === undefined) window.currentRecuerdoPhoto = 0;
  
  const imgDisplay = document.getElementById('carousel-photo-display');
  const imgContainer = document.getElementById('photo-container');
  const captionEl = document.getElementById('photo-caption');
  const prevBtn = document.getElementById('photo-prev');
  const nextBtn = document.getElementById('photo-next');
  
  // Captions personalizados para cada foto
  const captions = [
  "Nuestra primera cita formal <3",
  "Primera selfie juntos",
  "Cuando me adueñe de tu bucito",
  "El dia que me robaron el cel xd",
  "silloncito",
  "Día en que aprobamos la última materia !",
  "Volviendo de Río Cuarto",
  "Cuando me viste concursar",
  "Primer recital juntitos",
  "Mi chefcito",
  "Bday kiss",
  "<3",
  "Tarde de parquecito",
  "Cafecito post museo de las armas",
  "eepyhead",
  "Streameandome mientras estudiaba",
  "Date <3",
  "Coffee date en areco",
  "Río areco",
  "Mis peluchitos cuidandote",
  "Date en san telmo ",
  "besito",
  "Mimos a distancia",
  "Shared alone time",
  "Sexy couple",
  "De mis fotos favoritas",
  ];
  
  // Actualizar caption inicial
  if (captionEl) {
    captionEl.textContent = captions[window.currentRecuerdoPhoto];
  }
  
  // Hacer que la imagen sea clickeable para abrir lightbox
  if (imgContainer) {
    imgContainer.onclick = () => {
      window.openLightbox(window.currentRecuerdoPhoto, window.fotosRecuerdos, captions);
    };
  }
  
  if (prevBtn && nextBtn) {
    prevBtn.onclick = (e) => {
      e.stopPropagation();
      window.currentRecuerdoPhoto = (window.currentRecuerdoPhoto - 1 + window.fotosRecuerdos.length) % window.fotosRecuerdos.length;
      imgDisplay.src = window.fotosRecuerdos[window.currentRecuerdoPhoto];
      if (captionEl) captionEl.textContent = captions[window.currentRecuerdoPhoto];
    };
    
    nextBtn.onclick = (e) => {
      e.stopPropagation();
      window.currentRecuerdoPhoto = (window.currentRecuerdoPhoto + 1) % window.fotosRecuerdos.length;
      imgDisplay.src = window.fotosRecuerdos[window.currentRecuerdoPhoto];
      if (captionEl) captionEl.textContent = captions[window.currentRecuerdoPhoto];
    };
  }
}

function renderSlide(index) {
  const content = document.getElementById('carousel-content');
  const slide = carouselSlides[index];
  
  content.innerHTML = slide.render();
  
  if (slide.onEnter) {
    setTimeout(() => slide.onEnter(), 100);
  }
  
  updateDots();
  
  // Mostrar botón de continuar en el último slide
  const finalButtonContainer = document.getElementById('final-button-container');
  if (index === carouselSlides.length - 1) {
    setTimeout(() => {
      finalButtonContainer.classList.remove('opacity-0');
      finalButtonContainer.classList.add('opacity-100');
    }, 500);
  } else {
    finalButtonContainer.classList.add('opacity-0');
    finalButtonContainer.classList.remove('opacity-100');
  }
}

function updateDots() {
  const dotsContainer = document.getElementById('carousel-dots');
  dotsContainer.innerHTML = carouselSlides.map((_, index) => `
    <div class="w-3 h-3 rounded-full transition-all duration-300 ${
      index === currentSlideIndex ? 'bg-rose-500 w-8' : 'bg-rose-200'
    }"></div>
  `).join('');
}

function initCarousel() {
  carouselSlides = createSlides();
  currentSlideIndex = 0;
  
  document.getElementById('days-count').textContent = correctDays;
  
  renderSlide(currentSlideIndex);
  
  const prevArrow = document.getElementById('prev-arrow');
  const nextArrow = document.getElementById('next-arrow');
  
  const newPrevArrow = prevArrow.cloneNode(true);
  const newNextArrow = nextArrow.cloneNode(true);
  prevArrow.parentNode.replaceChild(newPrevArrow, prevArrow);
  nextArrow.parentNode.replaceChild(newNextArrow, nextArrow);
  
  newPrevArrow.addEventListener('click', () => {
    currentSlideIndex = (currentSlideIndex - 1 + carouselSlides.length) % carouselSlides.length;
    renderSlide(currentSlideIndex);
  });
  
  newNextArrow.addEventListener('click', () => {
    currentSlideIndex = (currentSlideIndex + 1) % carouselSlides.length;
    renderSlide(currentSlideIndex);
  });
  
  const continueToFinalBtn = document.getElementById('continue-to-final-btn');
  if (continueToFinalBtn) {
    const newContinueBtn = continueToFinalBtn.cloneNode(true);
    continueToFinalBtn.parentNode.replaceChild(newContinueBtn, continueToFinalBtn);
    
    newContinueBtn.addEventListener('click', () => {
      sceneManager.transitionTo('scene-5', 1200);
    });
  }
}

// LIGHTBOX
let currentLightboxIndex = 0;
let currentPhotosArray = [];
let currentCaptions = [];

window.openLightbox = function(index, photos, captions = []) {
    currentLightboxIndex = index;
    currentPhotosArray = photos;
    currentCaptions = captions;

    // Cambiar el icono según el álbum
    const prevImg = document.getElementById('lightbox-prev-img');
    const nextImg = document.getElementById('lightbox-next-img');

    if (photos === window.fotosRecuerdos) {
        prevImg.src = "/bcs-mug.png";
        nextImg.src = "/bcs-mug.png";
        // Ajustamos rotación para la taza si es necesario
        prevImg.classList.replace('rotate-180', '-scale-x-100'); 
    } else {
        prevImg.src = "/wine.png";
        nextImg.src = "/wine.png";
        prevImg.classList.add('rotate-180');
        prevImg.classList.remove('-scale-x-100');
    }

    window.updateLightbox();
    const lb = document.getElementById('lightbox');
    lb.classList.remove('hidden');
    lb.classList.add('flex');
};

window.updateLightbox = function() {
    const img = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-caption');
    
    if (img && currentPhotosArray[currentLightboxIndex]) {
        const fotoPath = currentPhotosArray[currentLightboxIndex];
        
        // Si el string ya empieza con '/' o contiene una carpeta (como 'nap/'), 
        // lo usamos directo. Si no, le agregamos la '/'
        img.src = (fotoPath.startsWith('/') || fotoPath.includes('/')) 
                  ? fotoPath 
                  : `/${fotoPath}`;
    }
    
    if (caption) {
        const captionText = currentCaptions[currentLightboxIndex] || '';
        caption.textContent = captionText;
        caption.style.display = captionText ? 'block' : 'none';
    }
}

window.closeLightbox = function() {
    const lb = document.getElementById('lightbox');
    lb.classList.add('hidden');
    lb.classList.remove('flex');
};

window.lightboxNext = function() {
    currentLightboxIndex = (currentLightboxIndex + 1) % currentPhotosArray.length;
    syncCarouselIndex(); // Función nueva para sincronizar
    window.updateLightbox();
};

window.lightboxPrev = function() {
    currentLightboxIndex = (currentLightboxIndex - 1 + currentPhotosArray.length) % currentPhotosArray.length;
    syncCarouselIndex(); // Función nueva para sincronizar
    window.updateLightbox();
};

function syncCarouselIndex() {
    // Si el array que estamos viendo en lightbox es el de Mendoza
    if (currentPhotosArray === window.misFotosDeViaje) {
        window.currentTravelPhoto = currentLightboxIndex;
        // Si el slide de viaje está visible, actualizamos su imagen
        const travelImg = document.getElementById('travel-photo-display');
        if (travelImg) travelImg.src = window.misFotosDeViaje[window.currentTravelPhoto];
    } 
    // Si es el de las fotos varias (Recuerdos)
    else if (currentPhotosArray === window.fotosRecuerdos) {
        // Asumiendo que usas una variable global para el índice de fotosRecuerdos
        window.currentPhotoIndex = currentLightboxIndex; 
        const recallImg = document.getElementById('carousel-photo-display');
        if (recallImg) recallImg.src = window.fotosRecuerdos[window.currentPhotoIndex];
    }
}

// ========================================
// SCENE 5: FINAL MESSAGE
// ========================================
const finalNextLineBtn = document.getElementById("final-next-line-btn");
const finalNextButtonContainer = document.getElementById("final-next-button-container");

let currentFinalLineIndex = 0;
let finalLines = [];
let isFinalEndOfMessage = false;

sceneManager.registerScene('scene-5', {
  onEnter: () => {
    finalLines = document.querySelectorAll('.final-seq-line');
    currentFinalLineIndex = 0;
    isFinalEndOfMessage = false;
    
    setTimeout(() => {
      finalNextButtonContainer.classList.add('opacity-100');
      finalNextButtonContainer.classList.remove('opacity-0');
    }, 500);
  }
});

function showNextFinalLine() {
  if (currentFinalLineIndex >= finalLines.length) {
    isFinalEndOfMessage = true;
    return;
  }

  const currentLine = finalLines[currentFinalLineIndex];
  currentLine.classList.add('is-visible');
  currentFinalLineIndex++;

  if (currentFinalLineIndex >= finalLines.length) {
    isFinalEndOfMessage = true;
    // Ocultar el botón cuando terminan todas las líneas
    setTimeout(() => {
      finalNextButtonContainer.classList.add('opacity-0');
      finalNextButtonContainer.classList.remove('opacity-100');
    }, 800);
  }
}

if (finalNextLineBtn) {
  finalNextLineBtn.addEventListener("click", () => {
    if (!isFinalEndOfMessage) {
      showNextFinalLine();
    }
  });
}

// KEYBOARD NAVIGATION
document.addEventListener('keydown', (e) => {
  const currentScene = sceneManager.getCurrentSceneId();
  
  if (e.key === 'Enter') {
    if (currentScene === 'scene-mail') {
      mailbox.click();
    } else if (currentScene === 'scene-letter' && !nextLineBtn.disabled) {
      nextLineBtn.click();
    } else if (currentScene === 'scene-5' && !isFinalEndOfMessage) {
      finalNextLineBtn.click();
    }
  }
  
  if (e.key === ' ') {
    if (currentScene === 'scene-letter' && !nextLineBtn.disabled) {
      e.preventDefault();
      nextLineBtn.click();
    } else if (currentScene === 'scene-5' && !isFinalEndOfMessage) {
      e.preventDefault();
      finalNextLineBtn.click();
    }
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    window.closeLightbox();
  }
});

// ========================================
// BACK BUTTON LOGIC
// ========================================
const backButton = document.getElementById('back-button');
let sceneHistory = [];

// Modificar el SceneManager para trackear el historial
const originalTransitionTo = sceneManager.transitionTo.bind(sceneManager);
sceneManager.transitionTo = function(nextSceneId, delay = 1000, isBack = false) {
  const currentId = this.currentSceneId;
  
  // Solo agregar al historial si no es una navegación de "volver"
  if (!isBack && currentId && currentId !== nextSceneId) {
    sceneHistory.push(currentId);
  }
  
  originalTransitionTo(nextSceneId, delay);
  updateBackButton();
};

function updateBackButton() {
  const currentScene = sceneManager.getCurrentSceneId();
  
  // Mostrar botón en todas las escenas excepto la primera
  if (currentScene && currentScene !== 'scene-mail' && sceneHistory.length > 0) {
    backButton.classList.remove('opacity-0', 'pointer-events-none');
    backButton.classList.add('opacity-100', 'pointer-events-auto');
  } else {
    backButton.classList.add('opacity-0', 'pointer-events-none');
    backButton.classList.remove('opacity-100', 'pointer-events-auto');
  }
}

if (backButton) {
  backButton.addEventListener('click', () => {
    if (sceneHistory.length > 0) {
      const previousScene = sceneHistory.pop();
      
      // Resetear el estado de las escenas al volver
      if (previousScene === 'scene-letter') {
        currentLineIndex = 0;
        isEndOfMessage = false;
        lines.forEach(line => line.classList.remove('is-visible'));
        if (nextButtonContainer) {
          nextButtonContainer.classList.remove('opacity-0');
          nextButtonContainer.classList.add('opacity-100');
        }
      } else if (previousScene === 'scene-5') {
        currentFinalLineIndex = 0;
        isFinalEndOfMessage = false;
        finalLines.forEach(line => line.classList.remove('is-visible'));
        if (finalNextButtonContainer) {
          finalNextButtonContainer.classList.remove('opacity-0');
          finalNextButtonContainer.classList.add('opacity-100');
        }
      } else if (previousScene === 'scene-4') {
        // Resetear el carousel al primer slide
        currentSlideIndex = 0;
        if (carouselSlides.length > 0) {
          renderSlide(0);
        }
      }
      
      // Transicionar marcando que es una navegación de "volver"
      sceneManager.transitionTo(previousScene, 800, true);
    }
  });
}

// INITIALIZE
document.addEventListener('DOMContentLoaded', () => {
  sceneManager.currentSceneId = 'scene-mail';
  setupMusicControls();
  updateBackButton();
});