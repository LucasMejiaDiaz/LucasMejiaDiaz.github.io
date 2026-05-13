import express from "express";

const app = express();
const puerto = process.env.PORT || 1990;

app.use(express.json());

let usuarios = [
  { nombre: "Punk", saldo: 0 },
  { nombre: "Lucas", saldo: 100 },
  { nombre: "Andrea", saldo: 250 },
];

const movimientos = [
  { usuario: "Lucas", tipo: "deposito", cantidad: 500 },
  { usuario: "Lucas", tipo: "retiro", cantidad: 100 },
  { usuario: "Andrea", tipo: "deposito", cantidad: 250 },
];

// Ejercicio inventado:
// Crear una API de banco donde el nombre, tipo de movimiento y cantidad
// viajan como parametros en la ruta.

app.get("/", (req, res) => {
  res.send("Ejercicio 12: parametros en rutas con Express");
});

app.get("/api/usuarios", (req, res) => {
  res.status(200).json(usuarios);
});

app.get("/api/usuarios/:nombre", (req, res) => {
  const nombre = req.params.nombre;
  const usuario = usuarios.find(
    (item) => item.nombre.toLowerCase() === nombre.toLowerCase()
  );

  if (!usuario) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  res.status(200).json(usuario);
});

app.get("/api/movimientos/:tipo", (req, res) => {
  const tipo = req.params.tipo;
  const movimientosFiltrados = movimientos.filter(
    (item) => item.tipo.toLowerCase() === tipo.toLowerCase()
  );

  if (movimientosFiltrados.length === 0) {
    return res.status(404).json({ error: "No hay movimientos de ese tipo" });
  }

  res.status(200).json(movimientosFiltrados);
});

app.post("/api/usuarios/:nombre/deposito/:cantidad", (req, res) => {
  const nombre = req.params.nombre;
  const cantidad = Number(req.params.cantidad);

  if (Number.isNaN(cantidad) || cantidad <= 0) {
    return res.status(400).json({ error: "La cantidad debe ser mayor a 0" });
  }

  let usuario = usuarios.find(
    (item) => item.nombre.toLowerCase() === nombre.toLowerCase()
  );

  if (!usuario) {
    usuario = { nombre, saldo: 0 };
    usuarios.push(usuario);
  }

  usuario.saldo += cantidad;

  res.status(201).json({
    mensaje: "Deposito registrado",
    usuario,
  });
});

app.delete("/api/usuarios/:nombre", (req, res) => {
  const nombre = req.params.nombre;
  const existeUsuario = usuarios.some(
    (item) => item.nombre.toLowerCase() === nombre.toLowerCase()
  );

  if (!existeUsuario) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  usuarios = usuarios.filter(
    (item) => item.nombre.toLowerCase() !== nombre.toLowerCase()
  );

  res.status(200).json({ mensaje: "Usuario eliminado" });
});

app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

app.listen(puerto, () => {
  console.log(`Servidor del ejercicio 12 en http://localhost:${puerto}`);
});
