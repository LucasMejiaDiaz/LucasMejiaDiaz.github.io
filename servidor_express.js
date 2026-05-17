import express from "express";
import mysql from  "mysql2";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const puerto = process.env.PORT || 1984;

app.use(express.json());
app.use(express.static("public"));
app.use("/public", express.static("public"));
// Express me parece mas sencillo que usar http puro, porque las rutas se leen
// directo con app.get y no tengo que hacer tantos if con req.url.

const connection = mysql.createConnection({
  host: "mysql-19eaaa18-tec-bfc5.i.aivencloud.com",
  port: 24518,
  user: "avnadmin",
  password: process.env.AIVEN_MYSQL_PASSWORD,
  database: "defaultdb",
  ssl: {
    rejectUnauthorized: false
  }
});

connection.connect((error) => {
  if (error) {
    console.error("No se pudo conectar a MySQL. Revisa que Aiven este prendido y que el host este bien copiado.");
    console.error(error.message);
    return;
  }

  console.log("Conectado a la nueva base de datos MySQL de Aiven");

  const crearTablaOfertasSQL = `
    CREATE TABLE IF NOT EXISTS ofertaskueski (
      id INT PRIMARY KEY AUTO_INCREMENT,
      descripcion VARCHAR(255) NOT NULL,
      monto DECIMAL(10,2) NOT NULL,
      cliente VARCHAR(100),
      fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

const insertarOfertaSQL = `
  INSERT INTO ofertaskueski (descripcion, monto, cliente)
  VALUES 
    ('Oferta para comprar laptop', 12000, 'Lucas'),
    ('Oferta para pagar celular', 3500, 'Andrea'),
    ('Oferta para comprar audífonos', 800, 'Punk');
`;


const consultaSQL = `
  SELECT * FROM ofertaskueski;
`;

  connection.query(insertarOfertaSQL, (error) => {
    if (error) {
      throw error;
    }

    console.log("Tabla ofertaskueski lista");
  });
});
const consultaSQL = `
  SELECT * FROM ofertaskueski;
`;



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

app.get("/ofertaskueski", (req, res) => {
  const consultaSQL = `
    SELECT * FROM ofertaskueski;
  `;

  connection.query(consultaSQL, (error, resultados) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json(resultados);
  });
});

app.post("/ofertaskueski", (req, res) => {
  const descripcion = req.body.descripcion || "Oferta de prueba Kueski";
  const monto = req.body.monto || 100;
  const cliente = req.body.cliente || "Cliente de prueba";

  const insertarSQL = `
    INSERT INTO ofertaskueski (descripcion, monto, cliente)
    VALUES (?, ?, ?);
  `;

  connection.query(insertarSQL, [descripcion, monto, cliente], (error, resultado) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(201).json({
      mensaje: "Oferta agregada",
      id: resultado.insertId,
      descripcion,
      monto,
      cliente,
    });
  });
});

// Esta ruta queda al final para responder cuando no existe la pagina solicitada.
app.use((req, res) => {
  res.status(404).send("ERRrpRprPRoroRroORORoroROorOROro.");
});

app.listen(puerto, () => {
  console.log(`Servidor Express escuchando en http://localhost:${puerto}`);
});
