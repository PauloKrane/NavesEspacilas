const BALA_MOVER = 20;
const ENEMIGO_HEIGHT = 80;
const GENERAR_ENEMIGO_INTERVAL = 13;//50
const INTERVAL = 100;
const TIEMPO_SOBREVIVIR = 1000;

var nave, body, laser, explosion, live, lives, tiempo, segundos, generarEnemigo, enemigos;

function setupListeners() { //configuramos de los eventos del mouse que captamos.
  document.addEventListener('mousemove', moveNave);//Mueve la nave espacial horizontalmente siguiendo el movimiento del mouse.
  document.addEventListener('click', disparar);//crea una bala al hacer click con el mouse.
}

function moveNave(event) { 
  const posX = event.clientX;//Tomando la posición del puntero del mouse y ajustando la posición de la nave en consecuencia. 
  const MITAD_NAVE =  Math.floor(nave.getBoundingClientRect().width/2);//Calcular la mitad del ancho de la clase nave.
  const newLeft = posX - MITAD_NAVE  + 'px';//Calcular la nueva posición izquierda del elemento "nave".
  nave.style.left = newLeft;//Aplicar la nueva posición al elemento "nave".
}

function disparar() {
  const bala = document.createElement('div'); //Crea un nuevo elemento HTML div y lo almacena en la variable bala. 
  bala.classList.add('bala'); //Se agrega la clase CSS 'bala'para aplicar estilo CSS en tu hoja de estilo.
  bala.style.bottom = 125 + 'px';//Se establece la propiedad bottom del estilo CSS del elemento div para posicionar la bala.
  bala.style.left = nave.getBoundingClientRect().left + 40 + 'px'; //Coloca la bala en  posición a la que se mueve la nave en ese momento 
  laser.play(); // Reproduce el sonido en el momento en que se dispara la bala.
  body.append(bala);//Hace que la bala aparezca en la pantalla.
}

function moveBalas() {
  let balas = document.querySelectorAll('.bala');
  balas.forEach(bala => {
    let positionBalaTop = bala.getBoundingClientRect().top;
    bala.style.top = (positionBalaTop - BALA_MOVER) + 'px';//Esto hace que la bala se mueva hacia arriba en la pantalla
    if (positionBalaTop <= 0) {
      bala.remove();
    } 
  }); 
}

function destruirEnemigo() {
  let destruirBalas =document.querySelectorAll('.bala');
  let enemigos = document.querySelectorAll('.enemigo');
  destruirBalas.forEach (bala => {
    enemigos.forEach(enemigo => {
        if (bala.getBoundingClientRect().top <= enemigo.getBoundingClientRect().top + ENEMIGO_HEIGHT) {
        if (bala.getBoundingClientRect().left >= enemigo.getBoundingClientRect().left &&
          bala.getBoundingClientRect().left <= enemigo.getBoundingClientRect().left + 80) {
          explosion.play();
          enemigo.style.backgroundImage = 'url("/imagenes/explosion/explosion.png")';
          enemigo.style.height = ENEMIGO_HEIGHT + 'px';
          bala.remove();
          setTimeout(() => {
            enemigo.remove();
           
            explosion.pause();
          },600);
         
        }
      }
    });
  });
}

function crearEnemigos() {
  generarEnemigo++;
  if (generarEnemigo % GENERAR_ENEMIGO_INTERVAL === 0) {
    let enemigo = document.createElement('div');
    enemigo.classList.add('enemigo');
    body.append(enemigo);
    let posicionAleatoria = (Math.random() * window.innerWidth - enemigo.clientWidth);
    if (posicionAleatoria + enemigo.clientWidth > window.innerWidth) {
      posicionAleatoria = window.innerWidth - enemigo.clientWidth;
    }
    if (posicionAleatoria < 0) {
      posicionAleatoria = 0;
    }
    enemigo.style.left = posicionAleatoria + 'px';
  }
  let enemigos = document.querySelectorAll('.enemigo');
  enemigos.forEach(enemigo => {
    let positionEnemigo = enemigo.getBoundingClientRect().top;
    let positionNaveTop = nave.getBoundingClientRect().top;
    enemigo.style.top = (positionEnemigo + 10) + 'px';
    if (positionEnemigo > positionNaveTop) {
      lives--;
      live.textContent = lives;
      if (lives == 0){
        alert("Perdiste el juego")
        location.reload();
      }
      enemigo.remove();
    }
    
  });
}

function sobrevivir() {//cronometro sobrevivir 60 segundos para ganar juego
  setInterval(()=>{
    segundos--;
    tiempo.textContent=segundos;
    if (segundos === -1){
        alert('Ganaste el juego');
        location.reload();
    }
  }, TIEMPO_SOBREVIVIR);
}

function setupIntervalo(intervalo){
  setInterval(crearEnemigos,intervalo);
  setInterval(moveBalas,intervalo);
  setInterval(destruirEnemigo,intervalo);
}

function selectorNave (){
  let radioNave = document.getElementById("selectorNave");
  if (radioNave.checked) {
    nave.style.backgroundImage = 'url("/imagenes/naves/nave1.png")';
  } else {
    nave.style.backgroundImage = 'url("/imagenes/naves/nave2.png")';
  }   
}

function initGame() {
  nave = document.querySelector('.nave');
  body = document.querySelector('body');
  laser = document.getElementById('laser');
  explosion = document.getElementById('explocion');
  live = document.getElementById ('live');
  enemigos = document.querySelectorAll('.enemigo');
  lives = 5;
  tiempo = document.getElementById('time');
  segundos = 60;
  generarEnemigo = 0;
  intervalGenerarEnemigo = 50;
  
  selectorNave();
  sobrevivir();
  setupListeners();
  setupIntervalo(INTERVAL);
}

function ocultarMenuJugar() {
  let ocultarMenu = document.getElementById('menu');
  let pantallaJugar = document.getElementById('pantallaJugar');
  ocultarMenu.style.display = "none";
  pantallaJugar.style.display = 'block';
  initGame();
}
 






 