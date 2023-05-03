const body = document.querySelector("body");
const title = document.querySelector("h1");

function cambiarColor(codigo) { // codigo --> #fabada
    body.style.backgroundColor = codigo;
    title.style.color = "white";
    title.style.textShadow = "2px 2px 0 black";
    title.innerHTML = codigo;
}

function hexadecimal({r, g, b}) {
    return "#" + [r,g,b].map(n => `${n < 16 ? "0" : ""}${n.toString(16)}`).join("");
}

fetch("http://localhost:4000")
.then(respuesta => respuesta.json())
.then(color => {
    cambiarColor(hexadecimal(color));
});