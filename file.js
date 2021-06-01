//variables del juego
var jugador_simbolo;
var pc_jugando = false;
var pc_simbolo;
var contador = 0;
var partida_en_curso = true;



// referencias a los elementos html guardadas en constantes
const opcion_jugar_pc = document.querySelector("#op1")
const opcion_jugar_humano = document.querySelector("#op2")
const cuadrante = document.getElementsByClassName("q");
const q1 = document.getElementById("q1");
const q2 = document.getElementById("q2");
const q3 = document.getElementById("q3");
const q4 = document.getElementById("q4");
const q5 = document.getElementById("q5");
const q6 = document.getElementById("q6");
const q7 = document.getElementById("q7");
const q8 = document.getElementById("q8");
const q9 = document.getElementById("q9");
const audio_fondo = document.querySelector("#audio_fondo");
const menu = document.querySelector("#config_partida")
const matriz = document.querySelector("#matriz")
const win = document.querySelector("#win")
const video = document.querySelector("video")
const pc_bando = document.querySelector("#pc_bando");
const amigo_bando = document.querySelector("#amigo_bando");
const x_rojo = document.querySelector("#x_rojo")
const circulo_amarillo = document.querySelector("#circulo_amarillo")
const x_amarillo = document.querySelector("#x_amarillo")
const circulo_rojo = document.querySelector("#circulo_rojo")
const boton_inicio = document.querySelector("#iniciar")
const boton_volver = document.querySelector("#volver")
const audio_boton = document.querySelector("#button")
const turno = document.querySelector("#turno")
const texto_ganador = document.querySelector("#texto_ganador")
const boton_reiniciar = document.querySelector("#reiniciar")


audio_fondo.play()




// funcion que retorna un  valor entero aleatorio comrendido en un rango
function aleatoreo(num_min, num_max){
  return Math.floor(Math.random()*((num_max+1)-num_min)+num_min);
}

// se describe lo que ocurre cuando se presiona la opcion de jugar contra la pc
opcion_jugar_pc.onclick = function(){
  audio_boton.play()
  video.style.display = "none";
  circulo_amarillo.style.display = "none";
  x_amarillo.style.display = "none";
  aparecer_mensaje(amigo_bando, pc_bando); // el segundo argumento guarda la ref a borrar
  pc_jugando = true;
  aparecer_bando();
}

// se describe lo que ocurre cuando se presiona la opcion de jugar contra un compañero
opcion_jugar_humano.onclick = function(){
  video.style.display = "none";
  circulo_amarillo.style.display = "none";
  x_amarillo.style.display = "none";
  audio_boton.play()
  aparecer_mensaje(pc_bando, amigo_bando) // el segundo argumento guarda la ref a borrar
  pc_jugando = false;
  aparecer_bando();
}

// permite que aparezca  las imagenes de la "x" y "o" a escoger
function aparecer_bando(){
  x_rojo.style.display="block";
  circulo_rojo.style.display="block";
}

// permite que aparezca  el mensaje  correspondiente, depende si se escogio
// jugar contra la pc o un compañero
function aparecer_mensaje(a,b){
  a.style.display = "none";
  b.style.display = "block";
}




// se describe lo que ocurre cuando se escoge circulo
circulo_rojo.onclick = function(){
  audio_boton.play()
  if(pc_jugando) pc_simbolo = "O";
  jugador_simbolo = "X";
  this.style.display = "none";
  circulo_amarillo.style.display = "block";
  x_amarillo.style.display = "none";
  x_rojo.style.display = "block";
  boton_inicio.style.display = "block";
}

// se describe lo que ocurre cuando se escoge equis
x_rojo.onclick = function(){
  audio_boton.play()
  if(pc_jugando) {pc_simbolo = "X"; jugador_simbolo="O";}
  else jugador_simbolo = "X";
  this.style.display = "none";
  x_amarillo.style.display = "block";
  circulo_amarillo.style.display = "none";
  circulo_rojo.style.display = "block";
  boton_inicio.style.display = "block";
}

// inciar partida 
boton_inicio.onclick = function(){
  audio_boton.play()
  audio_fondo.pause();
  menu.style.display = "none";
  matriz.style.display = "block";
  boton_volver.style.display = "block";
  boton_reiniciar.style.display = "block";
  if(pc_jugando && pc_simbolo=="X") {
  cuadrante_pc = aleatoreo(0,8); 
  cuadrante[cuadrante_pc].innerText = "X";
  contador+=1;
  }
}

// eventos principales de la partida
for (var i=0; i< 9; i++) 

  cuadrante[i].onclick = function() { 
      if(this.innerText == "" && partida_en_curso) {
        this.innerText = jugador_simbolo;
        contador+=1;
        turno.play();
        verif_victoria(jugador_simbolo)
        if(pc_jugando && partida_en_curso){
              var t; // indice del cuadrante que escogerá la  pc
              while(1){
                 t = aleatoreo(0,8); if(cuadrante[t].innerText == "") break;
                }
              cuadrante[t].innerText = pc_simbolo; contador+=1;
              verif_victoria(pc_simbolo)
        }
        if(!pc_jugando) 
        if(jugador_simbolo == "X") 
        jugador_simbolo = "O"; else jugador_simbolo = "X";
      }
    }




// verifica si algun bando ganó, o si se ha empatado
function verif_victoria(a){

  if(q1.innerText + q2.innerText + q3.innerText  == a+a+a)
    change_color(q1,q2,q3,a); 

  else if(q4.innerText + q5.innerText + q6.innerText == a+a+a)
    change_color(q4,q5,q6,a);

  else if(q7.innerText + q8.innerText + q9.innerText == a+a+a)
    change_color(q7,q8,q9,a);  
 
  else if(q1.innerText + q5.innerText + q9.innerText == a+a+a)
    change_color(q1,q5,q9,a);  
   
  else if(q3.innerText + q5.innerText + q7.innerText == a+a+a)
    change_color(q3,q5,q7,a); 
    
  else if(q1.innerText + q4.innerText + q7.innerText == a+a+a)
    change_color(q1,q4,q7,a); 
  
  else if(q2.innerText + q5.innerText + q8.innerText == a+a+a)
    change_color(q2,q5,q8,a);

  else if(q3.innerText + q6.innerText + q9.innerText == a+a+a)
    change_color(q3,q6,q9,a); 

  else 
    
  if(contador==9) {
    texto_ganador.innerText = "Es un empate"; 
    texto_ganador.style.display = "block";
    partida_en_curso = false; }
  
}

// aparte de cambiar el color, manda a imprimir el mensaje de victoria
function change_color(a,b,c, d){
  a.style.color = b.style.color = c.style.color = "gold";
  win.play()
  texto_ganador.innerText= d+" Ha ganado";
  texto_ganador.style.display = "block";
  partida_en_curso = false;
}

// esta función reinicia el estado original de la matriz 
// respetando la configuracion inicial 
function reiniciar(){
  audio_boton.play()
  texto_ganador.style.display = "none";
  contador = 0;
  for (var i=0; i< cuadrante.length; i++) 
  {cuadrante[i].innerText = ""; cuadrante[i].style.color="red";}
  partida_en_curso = true;
 
  if(pc_jugando && pc_simbolo=="X") {
    cuadrante_pc = aleatoreo(0,8);
    cuadrante[cuadrante_pc].innerText = "X";
    contador+=1;
    }
   if(!pc_jugando) jugador_simbolo = "X";
}

// se invoca la funcion reiniciar cunado se da click en el botor reiniciar
boton_reiniciar.onclick = reiniciar;

// reinicia TODO a su estado orginal
boton_volver.onclick = function(){
  video.style.display = "block";
  audio_boton.play()
  audio_fondo.play()
  menu.style.display = "block";
  matriz.style.display = "none";
  x_rojo.style.display="none";
  circulo_rojo.style.display="none";
  x_amarillo.style.display="none";
  circulo_amarillo.style.display="none";
  pc_bando.style.display="none";
  amigo_bando.style.display="none";
  boton_inicio.style.display = "none";
  this.style.display = "none";
  boton_reiniciar.style.display = "none";
  texto_ganador.style.display = "none";
  pc_jugando = false;
  reiniciar();
 
}




