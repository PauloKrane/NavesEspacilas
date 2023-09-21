let nave = document.querySelector('.nave'); //se utiliza para acceder y manipular elementos HTML desde JavaScript.
let body = document.querySelector('body');
let laser = document.getElementById('laser');//seleccionar un elemento HTML específico en un documento web mediante su atributo id. 
let explocion = document.getElementById('explocion');
let live=document.querySelector('i');
let lives=5;
let tiempo=document.getElementById('tiempo');
let segundos=60;

//cronometro sobrevivir 60 segundos para ganar juego
setInterval(()=>{
    segundos--;
    tiempo.textContent=segundos;
    if (segundos==0){
        alert('Ganaste el juego');
        location.reload();
    }
}, 1000);

//movimiento de la nave
document.addEventListener('mousemove', (e) => { // Escuchar el evento "mouseleave" en el documento
  const posX = e.clientX;  // Obtener la posición del cursor del evento
  const newLeft = posX - 40 + 'px';  // Calcular la nueva posición izquierda del elemento "nave"
  nave.style.left = newLeft;  // Aplicar la nueva posición al elemento "nave"
});

//generar disparo
document.addEventListener('click',()=>{
    const bala=document.createElement('div');
    bala.classList.add('bala');
    bala.style.bottom=125+'px'
    bala.style.left=(nave.getBoundingClientRect().left+40)+'px';
    laser.play();
    body.append(bala);
})

//movimiento de disparo
setInterval(()=>{
    let balas =document.querySelectorAll('.bala');
    balas.forEach(bala => {
        let positionBala = bala.getBoundingClientRect().top;
        bala.style.top=(positionBala-20)+'px';
        if (positionBala<=0){
            bala.remove();
        }

    //Destruir enemigo
    let enemigos=document.querySelectorAll('.enemigo');
    enemigos.forEach(enemigo => {
    if (bala.getBoundingClientRect().top<=enemigo.getBoundingClientRect().top+50){
        if(bala.getBoundingClientRect().left>=enemigo.getBoundingClientRect().left
        && bala.getBoundingClientRect().left<=enemigo.getBoundingClientRect().left+80 ){
            explocion.play();
            enemigo.style.backgroundImage = 'url("/imagenes/explosion/explosion.png")';
            enemigo.style.height = 80+'px';
            setTimeout(() => {
                enemigo.remove();
                bala.remove();
            },90);
                    
        }
    }
});    
    });
},100);

//generar enemigos
let generarEnemigo=0;
setInterval ( ()=>{
    generarEnemigo++;
    if (generarEnemigo%50==0){
        let enemigo=document.createElement('div');
        enemigo.classList.add('enemigo');
        body.append(enemigo);
        enemigo.style.left=(Math.random()*window.innerWidth-130)+'px';
    }
    let enemigos=document.querySelectorAll('.enemigo');
    enemigos.forEach(enemigo => {
        let positionEnemigo = enemigo.getBoundingClientRect().top;
        enemigo.style.top=(positionEnemigo+10)+'px';
        if (positionEnemigo > nave.getBoundingClientRect().top){
            lives--;
            live.textContent=lives;
            enemigo.remove();
        }
    });  
},100)





 