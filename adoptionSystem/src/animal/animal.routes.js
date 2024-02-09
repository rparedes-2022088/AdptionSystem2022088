'use strict'
import express from 'express'
import { newAnimal, updateAnimal, buscarAnimal, eliminarAnimal } from './animal.controller.js'

const api = express.Router()

api.post('/newAnimal', newAnimal)
api.put('/updateAnimal/:id', updateAnimal)
api.post('/buscarAnimal', buscarAnimal)
api.delete('/eliminarAnimal/:id',eliminarAnimal)


export default api