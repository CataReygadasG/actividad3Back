const http = require("http");
const server = http.createServer((request, response)=> {
    response.end("primer servidor");
});
server.listen(8080, ()=> {
    console.log("Servidor en puerto 8080")
});
