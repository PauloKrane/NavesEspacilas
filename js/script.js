const NAVESpeed = 40;
const BALA_HEIGHT = 20;
const ENEMIGO_HEIGHT = 80;
const GENERAR_ENEMIGO_INTERVAL = 50;
const MOVIMIENTO_BALA_INTERVAL = 100;

let nave, body, laser, explosion, live, lives, tiempo, segundos;

function initGame() {
  nave = document.querySelector('.nave');git 
  body = document.querySelector('body');
  laser = document.getElementById('laser');
  explosion = document.getElementById('explosion');
  live = document.querySelector('i');
  lives = 5;
  tiempo = document.getElementById('tiempo');
  segundos = 60;

  setupListeners();
  startGameLoop();
}

function setupListeners() {
  document.addEventListener('mousemove', moveNave);
  document.addEventListener('click', disparar);
}

function moveNave(e) {
  const posX = e.clientX;
  const newLeft = posX - NAVESpeed + 'px';
  nave.style.left = newLeft;
}

function disparar() {
  const bala = document.createElement('div');
  bala.classList.add('bala');
  bala.style.bottom = 125 + 'px';
  bala.style.left = (nave.getBoundingClientRect().left + NAVESpeed) + 'px';
  laser.play();
  body.append(bala);
}

function moveBalas() {
  let balas = document.querySelectorAll('.bala');
  balas.forEach(bala => {
    let positionBalaTop = bala.getBoundingClientRect().top;
    bala.style.top = (positionBalaTop - BALA_HEIGHT) + 'px';
    if (positionBalaTop <= 0) {
      bala.remove();
    }
    
    // Lógica de colisión con enemigos
    checkCollision();
  });

}

function checkCollision() {
  let bala = document.querySelector('.bala');
  let enemigos = document.querySelectorAll('.enemigo');
  enemigos.forEach(enemigo => {
    if (bala.getBoundingClientRect().top <= enemigo.getBoundingClientRect().top + ENEMIGO_HEIGHT) {
      if (bala.getBoundingClientRect().left >= enemigo.getBoundingClientRect().left &&
        bala.getBoundingClientRect().left <= enemigo.getBoundingClientRect().left + 80) {
        explosion.play();
        enemigo.style.backgroundImage = 'url("/imagenes/explosion/explosion.png")';
        enemigo.style.height = ENEMIGO_HEIGHT + 'px';
        setTimeout(() => {
          enemigo.remove();
          bala.remove();
        }, 90);
      }
    }
  });
}

function generarEnemigos() {
  let generarEnemigo = 0;
  setInterval(() => {
    generarEnemigo++;
    if (generarEnemigo % GENERAR_ENEMIGO_INTERVAL === 0) {
      let enemigo = document.createElement('div');
      enemigo.classList.add('enemigo');
      body.append(enemigo);
      enemigo.style.left = (Math.random() * window.innerWidth - 130) + 'px';
    }
    let enemigos = document.querySelectorAll('.enemigo');
    enemigos.forEach(enemigo => {
      let positionEnemigo = enemigo.getBoundingClientRect().top;
      enemigo.style.top = (positionEnemigo + 10) + 'px';
      if (positionEnemigo > nave.getBoundingClientRect().top) {
        lives--;
        live.textContent = lives;
        enemigo.remove();
      }
    });
  }, GENERAR_ENEMIGO_INTERVAL);
}

function startGameLoop() {
  setInterval(() => {
    segundos--;
    tiempo.textContent = segundos;
    if (segundos == 0) {
      alert('Ganaste el juego');
      location.reload();
    }

    moveBalas();
  }, MOVIMIENTO_BALA_INTERVAL);

  generarEnemigos();

}

initGame();





 