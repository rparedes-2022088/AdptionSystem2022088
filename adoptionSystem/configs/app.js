//configuración de express

//importaciones
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { config } from 'dotenv'
import userRoutes from '../src/user/user.routes.js'
import animalRoutes from '../src/animal/animal.routes.js'

//Configuraciones
const app = express() //crear el servidor y guardandolo en app
config()
const port = process.env.PORT || 3200 //sino hay un proceso en ese puerto se activa ahi

//Configurar el servidor de express
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors()) //Aceptar las solicitudes de diferentes origenes(local,remoto) politicas de acceso
app.use(helmet()) //aplica capa de seguridad
app.use(morgan('dev')) //Crea logs de solicitudes al servidor HTTP

//Declaracion de rutas
app.use(userRoutes, animalRoutes)

//Levantar el servidor
//exports solo funciona en commonJS
//exports.initServer
export const initServer = ()=>{
    app.listen(port)
    console.log(`Server HTTP running in port ${port}`)
}