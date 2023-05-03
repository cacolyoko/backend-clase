const body = document.querySelector("body");
const title = document.querySelector("h1");

function cambiarColor(codigo) { // codigo --> #fabada
    body.style.backgroundColor = codigo;
    title.style.color = "white";
    title.style.textShadow = "2px 2px 0 black";
    title.innerHTML = codigo;
}

fetch("http://localhost:4000")
.then(respuesta => respuesta.json())
.then(color => {
    console.log(color);
});