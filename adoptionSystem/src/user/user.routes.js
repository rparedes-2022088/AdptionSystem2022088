'use strict'

import express from 'express'
import { test, register, login, update, deleteU } from './user.controller.js'

const api = express.Router() //instancia del enrutador de express

api.get('/test', test)
api.post('/register', register)
api.post('/login', login)
api.put('/update/:id', update)
api.delete('/delete/:id', deleteU)

export default api //const vs default
//export const hola = hola
//con la const tengo que usar el nombre que esta en este archivo
//con default se puede importar con otro nombre