//Seletores.
let pantalla = document.querySelector("canvas");
let botonNuevoJuego = document.getElementById("btn-nuevo-juego").style.display = "none"
let btnSalirDesaparecer = document.getElementById("btn-salir").style.display = "none"
let divAgregarPalabra = document.getElementById("agregar-palabra").style.display = 'none';
let btnNuevoJuego = document.getElementById("btn-nuevo-juego");
let btnSalir = document.getElementById("btn-salir");
let btnCancelar = document.getElementById("btn-cancelar");


var palabras = ['ALURA', 'AHORCADO', 'HTML', 'ORACLE', 'JAVASCRIPT', 'LOGICA', 'PROGRAMACION', 'DESAFIO'];
var tablero = document.getElementById('canvas').getContext('2d');
var palabraSecreta = "";
var letras = [];
var palabraCorrecta = "";
var errores = 8;
let letrasIncorrectas = [];
let numeroDeErrores = 8
let letraElegida = [];

//Eventos.

//Captura el id "iniciar-juego" en el click y direcciona el programa al método que inicia el juego.
document.getElementById("iniciar-juego").onclick = () => {
  iniciarJuego();
}

//Captura el id "btn-guardar", guarda la palabra agregada e inicia el juego.
document.getElementById("btn-guardar").onclick = () => {
  guardarPalabra();
 
}

//Actualiza la pantalla cuando el usuario hace click en el botón "nuevo juego".
btnNuevoJuego.addEventListener("click", function () {
  location.reload();
});

//Actualiza la pantalla cuando el usuario hace click en el botón "salir".
btnSalir.addEventListener("click", function () {
  location.reload();
});

//Actualiza la pantalla cuando el usuario hace click en el botón "cancelar".
btnCancelar.addEventListener("click", function () {
  location.reload();
});


//Sortea la palabra que será usada en el ahorcado.
function escogerPalabraSecreta() {
  let palabra = palabras[Math.floor(Math.random() * palabras.length)]
  palabraSecreta = palabra
  return palabra
}



//Verifica cual es la letra en que el usuario hizo click.
function verificarLetraClicada(key) {
  if (letras.length < 1 || letras.indexOf(key) < 0) {
    letras.push(key)
    return false
    
  }
  else {
    letras.push(key)
    return true
  }
}

function adicionarLetraCorrecta(i) {
  palabraCorrecta += palabraSecreta[i].toUpperCase()
}

function adicionarLetraIncorrecta(letter) {
  if (palabraSecreta.indexOf(letter) <= 0) {
    errores -= 1
  }
}


function verificarFinJuego(letra) {
  //Chequea si la letra ha sido incluída en el array de las letras correctas o incorrectas.
 if(letraElegida.length < palabraSecreta.length) { 
    //Incluye las letras ya digitadas en el array.
    letrasIncorrectas.push(letra);
    

    //Valida si el usuário cometió el número máximo de errores.
    if (letrasIncorrectas.length > numeroDeErrores) {
      perdiste()
    }
    else if(letraElegida.length < palabraSecreta.length) {
      adicionarLetraIncorrecta(letra)
      escribirLetraIncorrecta(letra, errores)
    }
  }
 } 

//Verifica si el usuario ha ganado.
function verificarVencedor(letra) {
  letraElegida.push(letra.toUpperCase());
  if (letraElegida.length == palabraSecreta.length) {

    ganaste()
    
  }

}



//Impide que teclas como shift y otras, sean consideradas errores y sean escritas.
function verificarLetra(keyCode) {
  if (typeof keyCode === "number" && keyCode >= 65 && keyCode <= 90) {
    return true;
  } else {
    return false;
  }
}


//Hace que los botones de la pantalla de home desaparezcan y los de agregar palabra, aparezcan.
function ensenarPantallaDeAgregarPalabra() {
  document.getElementById("div-desaparece").style.display = 'none';
  document.getElementById("agregar-palabra").style.display = "block";

}

//Guarda la palabra que el usuario quiere agregar.
function guardarPalabra() {
  
  //Captura lo que el usuario ha digitado.
  let nuevaPalabra = document.getElementById('input-nueva-palabra').value;

  //Incluye la palabra que el usuario digitó en el array de las palabras que seran sorteadas.
  if(nuevaPalabra !== ""){
    palabras.push(nuevaPalabra.toUpperCase());
    alert('La palabra fue guardada')
    
  
    //Hace que los componentes de la pantalla de agregar palabra desaparezcan.
    document.getElementById("agregar-palabra").style.display = "none";
    iniciarJuego();
  }
  else{
    alert("Ninguna palabra ha sido digitada")
  }

}

//Inicia el juego.
function iniciarJuego() {

  //Hace que los de iniciar juego y agregar palabra desaparezcan.
  document.getElementById("div-desaparece").style.display = 'none';

  //llama la función que dibuja el tablero del ahorcado
  dibujarTablero();

  //llama la función que sortea la palabra. 
  escogerPalabraSecreta();

  //llama la función que dibuja las líneas donde el usuario escribirá.
  dibujarLineas();

  //Hace que los botones de nuevo juego y salir aparezcan.
  document.getElementById("btn-nuevo-juego").style.display = "block"
  document.getElementById("btn-salir").style.display = "block"

  //Captura la letra que el usuario escribió.
  document.onkeydown = (e) => {
    //Pone la letra en letra mayuscula.
    let letra = e.key.toUpperCase()
    //Verifica si el usuario todavia no ha perdido.
    if (letrasIncorrectas.length <= numeroDeErrores) {
      if (!verificarLetraClicada(e.key) && verificarLetra(e.keyCode)) {
        if (palabraSecreta.includes(letra)) {
          adicionarLetraCorrecta(palabraSecreta.indexOf(letra))
          for (let i = 0; i < palabraSecreta.length; i++) {
            if (palabraSecreta[i] === letra) {
              escribirLetraCorrecta(i)
              verificarVencedor(letra)

            }
          }

        }
        //Si el usuario cometió más errores de los que son permitidos, 
        //llama las funciones que dibujan el ahorcado y exibe el mensaje de fin de juego.
        else {
          if (!verificarLetraClicada(e.key) && !verificarVencedor(letra)) return
          dibujarAhorcado(errores)
          verificarFinJuego(letra)
        }
      }
    }
    else {
      alert('Has agotado el límite de letras incorrectas')
    }

  };
}