import express from 'express';
import mysql from 'mysql2/promise';
import NodeCache from 'node-cache'
import dotenv from 'dotenv';
//Pendiente nombre de la librería
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();


//stdTTL
const myCache = new NodeCache({ stdTTL: 2026 });

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename); 

const app = express();


//Completa los datos correctos
const connection = await mysql.createConnection({
  host: "mysql-19eaaa18-tec-bfc5.i.aivencloud.com",
  port: 24518,
  user: "avnadmin",
  password: process.env.AIVEN_MYSQL_PASSWORD,
  database: "defaultdb",
});




let datosDB;
async function getDonantes() {
  const cacheKey = "misOfertasKueski";
  const consultaSQL = `SELECT * FROM ofertaskueski;`;

  const cachedDonantes = myCache.get(cacheKey);

  if (cachedDonantes) {
    console.log("Servido desde el caché");
    return cachedDonantes;
  }

  console.log("Consultando base de datos");

  const [resultados] = await connection.query(consultaSQL);

  console.log(resultados);

  myCache.set(cacheKey, resultados);
  datosDB = resultados;

  return datosDB;
}

app.get('/storage', (req, res) => {
  res.sendFile(path.join(__dirname, 'localStorage_por.html'));
});

app.get('/obtenerDatos', async (req, res) => {
  const datos = await getDonantes();
  res.json(datos);
});

app.listen(1984, () => {
  console.log('Up and up');
});
