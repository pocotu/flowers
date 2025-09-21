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
};