import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const puerto = 3000;

// Middleware para que Express entienda JSON automáticamente
app.use(express.json());

// Ruta principal: Enviar el HTML
app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/index.html");
});

// Ruta del clima
app.post("/clima", async (req, res) => {
  const { ciudad } = req.body; 

  if (!ciudad) {
    return res.status(400).json({ error: "Debes escribir una ciudad" });
  }

  try {
    const url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHERSTACK_KEY}&query=${ciudad}`;
    const respuesta = await fetch(url);
    const data = await respuesta.json();

    if (data.success === false) {
      return res.status(400).json({ error: data.error.info });
    }

    res.json({
      ciudad: data.location.name,
      pais: data.location.country,
      temperatura: data.current.temperature,
      descripcion: data.current.weather_descriptions[0]
    });
  } catch (error) {
    res.status(500).json({ error: "Error al consultar la API" });
  }
});

app.listen(puerto, () => {
  console.log(`Servidor en http://localhost:${puerto}`);
});