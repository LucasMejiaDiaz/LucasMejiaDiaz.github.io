import express from "express";

const app = express();
const puerto = process.env.PORT || 1984;

// Express me parece mas sencillo que usar http puro, porque las rutas se leen
// directo con app.get y no tengo que hacer tantos if con req.url.
app.use(express.static("public"));
app.use("/public", express.static("public"));

function enviarHtml(nombreArchivo, res) {
  res.sendFile(nombreArchivo, { root: process.cwd() });
}

app.get("/", (req, res) => {
  enviarHtml("bienvenida.html", res);
});

app.get("/usuarios", (req, res) => {
  enviarHtml("usuarios.html", res);
});

app.get("/perfil", (req, res) => {
  enviarHtml("perfil.html", res);
});

app.get("/movimientos", (req, res) => {
  enviarHtml("movimientos.html", res);
});

app.get("/equipo", (req, res) => {
  enviarHtml("equipo.html", res);
});

app.get("/opinion", (req, res) => {
  enviarHtml("opinion.html", res);
});

app.get("/api/usuarios", (req, res) => {
  const usuarios = [
    {
      nombre: "Punk",
      saldo: "0",
    },
    {
      nombre: "Lucas",
      saldo: "100",
    },
    {
      nombre: "Andrea",
      saldo: "250",
    },
  ];

  // Con Express puedo usar res.json y ya no necesito escribir JSON.stringify.
  res.json(usuarios);
});

app.get("/api/movimientos", (req, res) => {
  const movimientos = [
    {
      tipo: "Deposito",
      cantidad: 500,
    },
    {
      tipo: "Retiro",
      cantidad: 100,
    },
  ];

  res.json(movimientos);
});

// Esta ruta queda al final para responder cuando no existe la pagina solicitada.
app.use((req, res) => {
  res.status(404).send("ERRrpRprPRoroRroORORoroROorOROro.");
});

app.listen(puerto, () => {
  console.log(`Servidor Express escuchando en http://localhost:${puerto}`);
});
