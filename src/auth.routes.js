import { Router } from "express" 
//de esta manera se obtiene algo especifico
//import {login, logout, perfil, registro}from "./../controllers/auth.controller.js"
//import * as authController from "./../controllers/auth.controller.js"
import authController from "./controllers/auth.controller";
const Route = Router()

Route.post('/auth/login', authController.login);
Route.post('/auth/registro', authController.registro);
Route.get('/auth/perfil', authController.perfil);
Route.post('/auth/salir', authController.logout);

export default Route;