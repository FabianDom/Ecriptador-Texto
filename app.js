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
    




function encriptarTexto () {
    let textoUsuario = document.getElementById('texto_encriptador').value;
    let textoUsuarioEncriptado = '';
    console.log(textoUsuario)
    for (let i = 0; i < textoUsuario.length; i++) {
        let caracterObtenido = textoUsuario[i]
        if(llavesEncriptacion[caracterObtenido]) {
        textoUsuarioEncriptado += llavesEncriptacion[caracterObtenido]
        } else {
            textoUsuarioEncriptado += caracterObtenido
        }
    }
    let textoEncriptadoFinal = document.getElementById('texto-encriptado')
    textoEncriptadoFinal.innerHTML = textoUsuarioEncriptado
    
};

