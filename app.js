// Require de paquetes
const express = require("express");
const app = express();
//const cors = require('cors');
require('dotenv').config({ path: '.env' });

// Cargar archivos rutas
const productRoutes = require("./router/products");
const userRoutes = require("./router/users");

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

// LO SACO PARA QUE NO TE DE PROBLEMAS DE CORS
/*
let whitelist = ["http://localhost:3000"];
let corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('No permitido por CORS'))
    }
  }
}
app.use(cors(corsOptions));
*/

// Routes section
app.get('/', (req, res) => {
  res.status(200).send({
    message: 'Bienvenidos a la API de la tienda'
  });
});
app.use("/api", productRoutes);
app.use("/api", userRoutes);

module.exports = app;