let llavesEncriptacion = {
  a: "ai",
  e: "enter",
  i: "imes",
  o: "ober",
  u: "ufat",
};

let llavesDesencriptacion = {
  ai: "a",
  enter: "e",
  imes: "i",
  ober: "o",
  ufat: "u",
};

let regex = /[A-Z0-9_\u00C0-\u00FF!\"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/;

function encriptarTexto() {
  // Obtener el texto ingresado por el usuario desde el campo de entrada
  let textoUsuario = document.getElementById("texto_encriptador").value;
  let textoUsuarioEncriptado = ""; // Variable para almacenar el texto encriptado

  // Iterar sobre cada carácter del texto ingresado
  for (let i = 0; i < textoUsuario.length; i++) {
    let caracterObtenido = textoUsuario[i]; // Obtener el carácter actual

    // Verificar si el carácter tiene una correspondencia en llavesEncriptacion
    if (llavesEncriptacion[caracterObtenido]) {
      // Si hay correspondencia, añadir el valor encriptado correspondiente
      textoUsuarioEncriptado += llavesEncriptacion[caracterObtenido];
    } else {
      // Si no hay correspondencia, añadir el carácter tal como está
      textoUsuarioEncriptado += caracterObtenido;
    }
  }
  // Mostrar el texto encriptado.
    let textoEncriptadoFinal = document.getElementById("texto-encriptado");
    textoEncriptadoFinal.innerHTML = textoUsuarioEncriptado;
 
  limpiarBotonCopiar ();


 
  // verificar si el texto se encuentra encriptado
  let verficarTexto = document.getElementById("verificar_mensaje");
  let botonCopiar = document.getElementById("boton_copiar");
  for (const propiedad in llavesDesencriptacion) {
    if (textoUsuario.includes(propiedad)) {
      textoEncriptadoFinal.innerHTML = '';
      verficarTexto.innerHTML = "El texto esta encriptado";
      if (verficarTexto) {
        verficarTexto.style.display = 'block';
        botonCopiar.style.display = 'none';
      } else {
        verficarTexto.style.display = 'none';
      }
    } 
  }
   
}

function desencriptarTexto() {
  // Obtener el texto ingresado por el usuario desde el campo de entrada
  let textoUsuario = document.getElementById("texto_encriptador").value;
  let textoUsuarioDesencriptado = textoUsuario; // Variable para almacenar el texto desencriptado

  // Iterar sobre cada propiedad en llavesDesencriptacion
  for (const propiedad in llavesDesencriptacion) {
    let valorLlaveDesencriptada = llavesDesencriptacion[propiedad]; // Obtener el valor de las llaves de desencriptación
    let coincidencias = new RegExp(propiedad, "g"); // Crear una expresión regular para encontrar todas las coincidencias de la llaves en el texto.

    // Reemplazar todas las coincidencias de la clave en el texto por el valor de desencriptación
    textoUsuarioDesencriptado = textoUsuarioDesencriptado.replace(
      coincidencias,
      valorLlaveDesencriptada
    );
  }

  // Mostrar el texto desencriptado en el elemento HTML con id 'texto-encriptado'
  
  let textoDesencriptadoFinal = document.getElementById("texto-encriptado");
  textoDesencriptadoFinal.innerHTML = textoUsuarioDesencriptado;

  // verificar si el texto se encuentra encriptado
  let verficarTexto = document.getElementById("verificar_mensaje");
  for (const propiedad in llavesDesencriptacion) {
    if (textoUsuario.includes(propiedad)) {
        verficarTexto.style.display = 'none';
      
    } 
  }
  limpiarBotonCopiar ();
}

function limpiarCampos() {
  let botonCopiar = document.getElementById("boton_copiar");
  let mensajeTemporal = document.getElementById("mensaje_copiado");
  let resultadoTexto = document.getElementById("texto_encriptador").value;
  let verficarTexto = document.getElementById("verificar_mensaje");
  if (resultadoTexto.trim() === "") {
    let limpiarTexto = document.getElementById("texto-encriptado");
    limpiarTexto.innerHTML = "";
    botonCopiar.style.display = "none";
    mensajeTemporal.style.display = "none";
    verficarTexto.style.display = 'none';
  } 
}

function caracteresExcluidos() {
  let textoUsuario = document.getElementById("texto_encriptador").value;
  let textoCaracteres = document.getElementById("texto-caracteres");
  let botonEncriptar = document.getElementById("boton_encriptar");
  let botonDesencriptar = document.getElementById("boton_desencriptar");
  if (regex.test(textoUsuario)) {
    textoCaracteres.innerHTML = "No se permite mayusculas ni acentos";
    botonEncriptar.disabled = true;
    botonDesencriptar.disabled = true;
  } else {
    textoCaracteres.innerHTML = "";
    botonEncriptar.disabled = false;
    botonDesencriptar.disabled = false;
  }
}

async function botonCopiar() {
  // Selecionar el id texto encriptado
  let textoEncriptado = document.getElementById("texto-encriptado");
  // Acceder a su valor
  let textoACopiar = textoEncriptado.innerHTML;
  // Seleccionar id para mostrar mensaje temporal de texto copiado
  let mensajeTemporal = document.getElementById("mensaje_copiado");
  try {
    // Esperar que el texto se copie al portapapeles
    await navigator.clipboard.writeText(textoACopiar);
    //Agregamos el mensaje que se quiere mostrar cuando el texto sea copiado y lo mostramos.
    mensajeTemporal.textContent = "Texto copiado";
    mensajeTemporal.style.display = "block";
    setTimeout(() => {
      mensajeTemporal.style.display = "none";
    }, 1500);
  } catch (error) {
    console.error("Ocurrio un error al copiar el texto", error);
  }
}

function limpiarBotonCopiar () {
  let textoUsuario = document.getElementById("texto_encriptador").value;
  let textoEncriptado = document.getElementById("texto-encriptado");
  let botonCopiar = document.getElementById("boton_copiar");
  if (textoUsuario.trim() === ""){
    return
  }
  if(textoEncriptado) {
    botonCopiar.style.display = 'block';
  } else {
    botonCopiar.style.display = 'none';
  }
}

// Inicializar visibilidad al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  limpiarCampos();
});

document
  .getElementById("texto_encriptador")
  .addEventListener("input", caracteresExcluidos);

document
  .getElementById("texto_encriptador")
  .addEventListener("input", limpiarCampos);
