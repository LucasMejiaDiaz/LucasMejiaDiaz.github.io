import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const connection = await mysql.createConnection({
  host: "mysql-31efc894-tec-f26e.e.aivencloud.com",
  port: 20902,
  user: "avnadmin",
  password: process.env.AIVEN_MYSQL_PASSWORD_DONANTES,
  database: "defaultdb",
  ssl: {
    rejectUnauthorized: false,
  },
});

const crearTablaSQL = `
  CREATE TABLE IF NOT EXISTS donantes (
      id INT PRIMARY KEY AUTO_INCREMENT,
      nombre VARCHAR(255) NOT NULL
  );
`;

const insertarDonanteSQL = `
  INSERT INTO donantes (nombre) VALUES ('Donante Anónimo');
`;

const consultaSQL = `
  SELECT * FROM donantes;
`;

console.log("Conectado a la base de datos");

await connection.query(crearTablaSQL);
console.log("Tabla donantes lista");

await connection.query(insertarDonanteSQL);
console.log("Donante insertado");

const [resultados] = await connection.query(consultaSQL);
console.log(resultados);

await connection.end();
console.log("Conexion cerrada");
