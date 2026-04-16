import http from "http";

const puerto = 2006;
const urlMaluma = "https://www.theaudiodb.com/api/v1/json/123/search.php?s=maluma";

const servidor = http.createServer(async (req, res) => {
  console.log("Alguien me mandó una solicitud");

  try {
    const respuesta = await fetch(urlMaluma);
    const data = await respuesta.json();

    const artista = data.artists[0];

    const biografia = artista.strBiographyES;

    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    res.end(`Biografía de Maluma:\n\n${biografia}`);
  } catch (error) {
    console.error(error);

  }
});

servidor.listen(puerto, () => {
  console.log(`Servidor escuchando en el puerto ${puerto}`);
});
