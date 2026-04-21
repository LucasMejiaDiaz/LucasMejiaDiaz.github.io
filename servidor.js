import http from 'http';
import url from 'url';

const servidor = http.createServer((req, res) => {
  console.log("Alguien me mandó una solicitud");
  //console.log(req);
const urlProcesada = url.parse(req.url, true);
 //console.log(urlProcesada);
 const queryParams = urlProcesada.query;
console.log(queryParams.x)
  const x = queryParams.x; 


  if (x === '1') {
    res.end('Respuesta uno\n');
  } else {
    res.end('Respuesta dos\n');
  }
});

const puerto = 1984;

servidor.listen(puerto, () => {
  console.log(`Servidor escuchando en el puerto ${puerto}`);
});

