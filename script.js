const frases = [
  "Eres el sol que ilumina mi día",
  "Tus besos son mi motivación",
  "Contigo el tiempo se detiene",
  "Tu sonrisa es mi felicidad",
  "Eres mi lugar favorito en el mundo",
  "Eres mi todo",
  "Contigo todo tiene sentido",
  "Tu voz es melodia para mis oídos",
  "Tu amor es mi fuerza",
  "Eres la música de mi corazón",
  "Tus abrazos son mi refugio",
  "Eres mi paz en la tormenta",
  "Tu risa es mi medicina favorita",
  "Eres mi estrella más brillante",
  "Contigo soy la mejor versión de mí",
  "Eres mi sueño más hermoso",
  "Tu amor me da esperanza",
  "Tus caricias son pura magia",
  "Eres mi inspiración diaria",
  "Tu voz es mi canción favorita",
  "Eres mi complemento perfecto",
  "Tus manos son mi lugar seguro",
  "Eres mi razón para sonreír",
  "Tu amor es mi vitamina diaria",
  "Eres mi tesoro más preciado",
  "Contigo cada día es especial",
  "Tu risa alegra mi existencia",
  "Tu presencia es mi regalo",
  "Eres mi persona favorita",
  "Tu amor es mi historia favorita"
];

let fraseIndex = 0;
let frasesActivas = [];
let ultimoClick = 0;

// Sistema de música
let audioElement;
let isPlaying = false;
let musicButton;

// Inicializar sistema de audio
function initAudio() {
  try {
    audioElement = new Audio('musica.mp3');
    audioElement.loop = true;
    audioElement.volume = 0.5; // 50% de volumen
    audioElement.preload = 'auto';
    audioElement.muted = false;
    
    // Forzar reproducción inmediata
    audioElement.play().then(() => {
      isPlaying = true;
      updateMusicButton();
      console.log('Música iniciada automáticamente');
    }).catch(error => {
      console.log('Intento 1 falló, probando método alternativo...');
      
      // Método alternativo: crear elemento audio en el DOM
      const audioInDOM = document.createElement('audio');
      audioInDOM.src = 'musica.mp3';
      audioInDOM.loop = true;
      audioInDOM.volume = 0.5;
      audioInDOM.autoplay = true;
      audioInDOM.preload = 'auto';
      audioInDOM.style.display = 'none';
      document.body.appendChild(audioInDOM);
      
      audioInDOM.play().then(() => {
        audioElement = audioInDOM;
        isPlaying = true;
        updateMusicButton();
        console.log('Música iniciada con método alternativo');
      }).catch(err => {
        console.log('Autoplay completamente bloqueado');
        // Como último recurso, iniciar con cualquier interacción
        const forceStart = (e) => {
          audioElement.play().then(() => {
            isPlaying = true;
            updateMusicButton();
          });
          document.removeEventListener('click', forceStart, true);
          document.removeEventListener('touchstart', forceStart, true);
          document.removeEventListener('keydown', forceStart, true);
        };
        
        document.addEventListener('click', forceStart, true);
        document.addEventListener('touchstart', forceStart, true);
        document.addEventListener('keydown', forceStart, true);
      });
    });
  } catch (error) {
    console.log('Audio no disponible:', error);
  }
}

function toggleMusic() {
  if (!audioElement) return;
  
  if (isPlaying) {
    audioElement.pause();
    isPlaying = false;
  } else {
    audioElement.play().then(() => {
      isPlaying = true;
    }).catch(error => {
      console.log('Error al reproducir audio');
    });
  }
  
  updateMusicButton();
}

function updateMusicButton() {
  if (musicButton) {
    if (isPlaying) {
      musicButton.classList.remove('muted');
      musicButton.querySelector('.music-icon').textContent = '🎵';
    } else {
      musicButton.classList.add('muted');
      musicButton.querySelector('.music-icon').textContent = '🔇';
    }
  }
}

function mostrarFrase(x, y) {
  // Prevenir clicks/toques duplicados muy rápidos
  const ahora = Date.now();
  if (ahora - ultimoClick < 300) return;
  ultimoClick = ahora;
  
  // Crear elemento de la frase
  const fraseElement = document.createElement('div');
  fraseElement.className = 'frase-romantica';
  fraseElement.textContent = frases[fraseIndex];
  
  // Posicionar la frase cerca del click/touch
  fraseElement.style.left = x + 'px';
  fraseElement.style.top = y + 'px';
  
  document.body.appendChild(fraseElement);
  frasesActivas.push(fraseElement);
  
  // Animar aparición
  setTimeout(() => {
    fraseElement.classList.add('aparecer');
  }, 50);
  
  // Remover después de la animación
  setTimeout(() => {
    fraseElement.classList.add('desaparecer');
    setTimeout(() => {
      if (fraseElement.parentNode) {
        fraseElement.parentNode.removeChild(fraseElement);
        // Remover de la lista de frases activas
        const index = frasesActivas.indexOf(fraseElement);
        if (index > -1) {
          frasesActivas.splice(index, 1);
        }
      }
    }, 1000);
  }, 3000);
  
  // Siguiente frase
  fraseIndex = (fraseIndex + 1) % frases.length;
}

function handleTouch(event) {
  event.preventDefault();
  event.stopPropagation();
  const touch = event.touches[0] || event.changedTouches[0];
  const x = touch.clientX;
  const y = touch.clientY;
  mostrarFrase(x, y);
}

function handleClick(event) {
  event.preventDefault();
  event.stopPropagation();
  const x = event.clientX;
  const y = event.clientY;
  mostrarFrase(x, y);
}

onload = () => {
  document.body.classList.remove("container");
  
  // Agregar event listeners para click y touch
  document.addEventListener('click', handleClick);
  document.addEventListener('touchstart', handleTouch);
  
  // Inicializar sistema de música
  musicButton = document.getElementById('musicToggle');
  audioElement = document.getElementById('backgroundMusic');
  
  if (audioElement) {
    audioElement.volume = 0.25; // 25% de volumen
    
    // Intentar reproducir inmediatamente
    audioElement.play().then(() => {
      isPlaying = true;
      updateMusicButton();
      console.log('Música AUTO iniciada desde HTML');
    }).catch(error => {
      console.log('Autoplay bloqueado, se iniciará con interacción');
      isPlaying = false;
      updateMusicButton();
    });
    
    // Event listener para cuando la música está lista
    audioElement.addEventListener('canplaythrough', () => {
      if (!isPlaying) {
        audioElement.play().then(() => {
          isPlaying = true;
          updateMusicButton();
        }).catch(() => {});
      }
    });
  }
  
  if (musicButton) {
    musicButton.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMusic();
    });
  }
  
  // Como respaldo, intentar iniciar con cualquier interacción
  const startMusic = () => {
    if (audioElement && !isPlaying) {
      audioElement.play().then(() => {
        isPlaying = true;
        updateMusicButton();
      });
    }
    document.removeEventListener('click', startMusic, true);
    document.removeEventListener('touchstart', startMusic, true);
  };
  
  document.addEventListener('click', startMusic, true);
  document.addEventListener('touchstart', startMusic, true);
};