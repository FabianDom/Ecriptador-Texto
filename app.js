// Llaves de encriptacion
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

// Variables Globales
let textoUsuario = document.getElementById("texto_encriptador");
let textoEncriptado = document.getElementById("texto-encriptado");
let mensajeInicial = document.getElementById("mensaje_inicial");
let imagenResultado = document.getElementById("imagen_resultado");
let botonCopiarTexto = document.getElementById("boton_copiar");
let mensajeSecundario = document.getElementById("mensaje_secundario");
let imagenLoader = document.getElementById("imagen_loader");
let imagenError = document.getElementById("imagen_error");
let imagenInfo = document.getElementById("imagen_info");
let mensajeTemporal = document.getElementById("mensaje_copiado");
let textoCaracteres = document.getElementById("texto-caracteres");
let botonEncriptar = document.getElementById("boton_encriptar");
let botonDesencriptar = document.getElementById("boton_desencriptar");

let regex = /[A-Z0-9_\u00C0-\u00FF!\"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/;

function encriptarTexto() {
  let texto = textoUsuario.value;
  let textoUsuarioEncriptado = "";
  for (let i = 0; i < texto.length; i++) {
    let caracterObtenido = texto[i];
    if (llavesEncriptacion[caracterObtenido]) {
      textoUsuarioEncriptado += llavesEncriptacion[caracterObtenido];
    } else {
      textoUsuarioEncriptado += caracterObtenido;
    }
  }
  textoEncriptado.innerHTML = textoUsuarioEncriptado;
  limpiarBotonCopiar();

  for (const propiedad in llavesDesencriptacion) {
    if (texto.includes(propiedad)) {
      textoEncriptado.innerHTML = "";
      mensajeInicial.innerHTML = "El texto está encriptado";
      mensajeInicial.style.display = "block";
      imagenResultado.style.display = "block";
      imagenError.style.display = "block";
      botonCopiarTexto.style.display = "none";
    }
  }
}

function desencriptarTexto() {
  let texto = textoUsuario.value;
  let textoUsuarioDesencriptado = texto;

  for (const propiedad in llavesDesencriptacion) {
    let valorLlaveDesencriptada = llavesDesencriptacion[propiedad];
    let coincidencias = new RegExp(propiedad, "g");
    textoUsuarioDesencriptado = textoUsuarioDesencriptado.replace(
      coincidencias,
      valorLlaveDesencriptada
    );
  }

  textoEncriptado.innerHTML = textoUsuarioDesencriptado;
  limpiarBotonCopiar();
}

function mensajesIniciales() {
  mensajeInicial.innerText = "Ningún mensaje fue encontrado";
  mensajeInicial.style.display = "block";
  mensajeSecundario.style.display = "block";
  imagenResultado.style.display = "block";
  imagenError.style.display = "none";
}

function actualizarCuadroTexto() {
  mensajeInicial.innerText = "Esperando Mensaje";
  mensajeInicial.style.display = "block";
  imagenLoader.style.display = "block";
  imagenResultado.style.display = "block";
  mensajeSecundario.style.display = "block";
  textoEncriptado.style.display = "none";
  botonCopiarTexto.style.display = "none";
  imagenError.style.display = "none";
}

function limpiarCampos() {
  if (textoUsuario.value.trim() === "") {
    textoEncriptado.innerHTML = "";
    botonCopiarTexto.style.display = "none";
    mensajeTemporal.style.display = "none";
    imagenLoader.style.display = "none";
    mensajesIniciales();
  }
}

function caracteresExcluidos() {
  if (regex.test(textoUsuario.value)) {
    imagenInfo.style.display = 'block'
    textoCaracteres.innerHTML = "Solo minúsculas, sin acentos ni caracteres especiales.";
    botonEncriptar.disabled = true;
    botonDesencriptar.disabled = true;
  } else {
    imagenInfo.style.display = 'none'
    textoCaracteres.innerHTML = "";
    botonEncriptar.disabled = false;
    botonDesencriptar.disabled = false;
  }
}

async function botonCopiar() {
  let textoACopiar = textoEncriptado.innerHTML;
  try {
    await navigator.clipboard.writeText(textoACopiar);
    mensajeTemporal.textContent = "Texto copiado";
    mensajeTemporal.style.display = "block";
    setTimeout(() => {
      mensajeTemporal.style.display = "none";
    }, 1500);
  } catch (error) {
    console.error("Ocurrió un error al copiar el texto", error);
  }
}

function limpiarBotonCopiar() {
  if (textoUsuario.value.trim() === "") {
    return;
  }
  if (textoEncriptado.innerHTML) {
    botonCopiarTexto.style.display = "block";
  } else {
    botonCopiarTexto.style.display = "none";
  }
}

function cuadroDeTexto() {
  botonEncriptar.addEventListener("click", function () {
    if (textoUsuario.value.trim() === "") {
      mensajesIniciales();
      imagenLoader.style.display = "none";
    } else {
      actualizarCuadroTexto();
      imagenLoader.style.display = "block";
      mensajeInicial.innerText = "Encriptando Mensaje";
      imagenResultado.style.display = "block";
      mensajeSecundario.style.display = "none";
      textoEncriptado.style.display = "none";
      botonCopiarTexto.style.display = "none";
      imagenError.style.display = "none";

      setTimeout(() => {
        imagenLoader.style.display = "none";
        mensajeInicial.style.display = "none";
        imagenResultado.style.display = "none";
        textoEncriptado.style.display = "block";
        botonCopiarTexto.style.display = "block";
        encriptarTexto();
      }, 1500);
    }
  });

  botonDesencriptar.addEventListener("click", function () {
    if (textoUsuario.value.trim() === "") {
      mensajesIniciales();
      imagenLoader.style.display = "none";
      return;
    } else {
      actualizarCuadroTexto();
      imagenLoader.style.display = "block";
      mensajeInicial.innerText = "Desencriptando Mensaje";
      imagenResultado.style.display = "block";
      mensajeSecundario.style.display = "none";
      textoEncriptado.style.display = "none";
      botonCopiarTexto.style.display = "none";
      imagenError.style.display = "none";

      setTimeout(() => {
        imagenLoader.style.display = "none";
        mensajeInicial.style.display = "none";
        imagenResultado.style.display = "none";
        textoEncriptado.style.display = "block";
        botonCopiarTexto.style.display = "block";
        desencriptarTexto();
      }, 1500);
    }
  });
}

cuadroDeTexto();

// Inicializar visibilidad al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  imagenInfo.style.display = 'none'
  limpiarCampos();
  textoUsuario.addEventListener("input", caracteresExcluidos);
  textoUsuario.addEventListener("input", limpiarCampos);
});
document
  .getElementById("texto_encriptador")
  .addEventListener("input", function () {
    textoEncriptado.innerHTML = "";
    actualizarCuadroTexto();
  });
