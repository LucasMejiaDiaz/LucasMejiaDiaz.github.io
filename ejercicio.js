import express from 'express';
import path from 'path'; // Importamos path para manejar rutas
import { fileURLToPath } from 'url';

const app = express();

// Configuración necesaria para obtener la ruta de nuestra carpeta actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.listen(1984, () => {
   console.log('Up and up');
});

app.get('/bienvenida', (req, res) => {
   res.send('Esto no es una página html');
});

app.get('/otraBienvenida', (req, res) => {
  // Solución: usamos path.join para dar la ruta absoluta
  res.sendFile(path.join(__dirname, 'bienvenida.html'));
});
