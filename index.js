const {createServer} = require("http");
const {createReadStream, stat} = require("fs");
const {join} = require("path");

let directorioPublico = "estaticos";

function contentType(extension) {
    switch(extension) {
        case "html":
            return "text/html";
        case "css":
            return "text/css";
        case "js":
            return "text/javascript";
        case "json":
            return "application/json";
        case "jpg":
            return "image/jpeg";
        case "png":
            return "image/png";
    }
}

function servirFichero(respuesta, ruta, tipo, status) {

    respuesta.writeHead(status, { "Content-type": tipo });

    let fichero = createReadStream(ruta);

    fichero.pipe(respuesta);

    fichero.on("end", () => respuesta.end());
}

createServer((peticion, respuesta) => {
    if (peticion.url == "/") {
        servirFichero(respuesta, join(__dirname, directorioPublico, "index.html"), contentType("html"), 200);

    } else {
        let ruta = join(__dirname, directorioPublico, peticion.url);
        stat(ruta, (error, estadisticas) => {
            if (!error && estadisticas.isFile()) {
                servirFichero(respuesta, ruta, contentType(ruta.split(".").pop()), 200);
            } else {
                servirFichero(respuesta, join(__dirname, "404.html"), contentType("html"), 404);
            }
        });
    }
}).listen(3000);