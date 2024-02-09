'use strict'
import express from 'express'
import { newAnimal, updateAnimal, buscarAnimal, eliminarAnimal, getAnimals } from './animal.controller.js'

const api = express.Router()

api.post('/newAnimal', newAnimal)
api.put('/updateAnimal/:id', updateAnimal)
api.post('/buscarAnimal', buscarAnimal)
api.delete('/eliminarAnimal/:id',eliminarAnimal)
api.get('/getAnimals', getAnimals)


export default api