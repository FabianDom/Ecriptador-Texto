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
  // verificar si el texto se encuentra encriptado
  for (const propiedad in llavesDesencriptacion) {
    if (textoUsuario.includes(propiedad)) {
      let textoUsuarioFinal = document.getElementById("texto-encriptado");
      textoUsuarioFinal.innerHTML = "El texto esta encriptado";
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
}

function limpiarCampoTextoEncriptado() {
  let resultadoTexto = document.getElementById("texto_encriptador").value;
  if (resultadoTexto.trim() === "") {
    let limpiarTexto = document.getElementById("texto-encriptado");
    limpiarTexto.innerHTML = "";
  }
}

function caracteresExcluidos () {
  let textoUsuario = document.getElementById("texto_encriptador").value;
  let textoCaracteres = document.getElementById("texto-caracteres");
  let botonEncriptar = document.getElementById("boton_encriptar");
  let botonDesencriptar = document.getElementById("boton_desencriptar");
  if (regex.test(textoUsuario)) {
    textoCaracteres.innerHTML = 'No se permite mayusculas ni acentos';
    botonEncriptar.disabled = true;
    botonDesencriptar.disabled = true;
  } else {
    textoCaracteres.innerHTML = ''
    botonEncriptar.disabled = false;
    botonDesencriptar.disabled = false;
}
}



document
  .getElementById("texto_encriptador")
  .addEventListener("input", limpiarCampoTextoEncriptado );
  document
  .getElementById("texto_encriptador")
  .addEventListener("input", caracteresExcluidos );