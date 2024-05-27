const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();

const path = require("path");
const fs = require("fs");

app.set("view engine", "ejs"); // Establecer EJS 
app.set("views", path.join(__dirname, "views")); // Carpeta de view


// Ruta que principal que muestra los botones para las categorías
app.get("/", (req, res) => {
  res.render("index");
});

// Ruta para mostrar solo frutas
app.get("/frutas", (req, res) => {
  fs.readFile(path.join(__dirname, "granja.json"), "utf-8", (err, data) => {
    if (err) {
      console.error('Error al leer el archivo:', err);
      res.status(500).send("Error al cargar los datos");
    } else {
      const items = JSON.parse(data).items.filter(item => item.categoria === 'Fruta');
      res.render("frutas", { items });
    }
  });
});

// Ruta para mostrar solo verduras
app.get("/verduras", (req, res) => {
  fs.readFile(path.join(__dirname, "granja.json"), "utf-8", (err, data) => {
    if (err) {
      console.error('Error al leer el archivo:', err);
      res.status(500).send("Error al cargar los datos");
    } else {
      const items = JSON.parse(data).items.filter(item => item.categoria === 'Verdura');
      res.render("verduras", { items });
    }
  });
});
 
// ruta para mostrar granja completa 

app.get("/granjacompleta", (req, res) => {
  fs.readFile(path.join(__dirname, "granja.json"), "utf-8", (err, data) => {
    if (err) {
      console.error('Error al leer el archivo:', err);
      res.status(500).send("Error al cargar los datos");
    } else {
      const granjaData = JSON.parse(data);
      const frutas = granjaData.items.filter(item => item.categoria === 'Fruta');
      const verduras = granjaData.items.filter(item => item.categoria === 'Verdura');
      res.render("granjacompleta", { frutas, verduras });
    }
  });
});

//uso de errores

app.use("*", (req, res,next) => {
  res.status(404).send("Página no encontrada");
});


// Configuración del puerto
const PORT = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
