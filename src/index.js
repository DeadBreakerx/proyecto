//const express = require('express');
import express from "express"
require('dotenv').config()

import rutasAuth from "./auth.routes"

const app = express();

app.use(express.json()); //para capturar datos (req.body) PARACONSULTAS

//habilitamos las rutas con express(app)
app.use("/api", rutasAuth) //rutas o urls de autenticación

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor iniciado en: http://127.0.0.1:${PORT}`)
})
