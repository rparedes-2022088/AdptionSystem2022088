'use strict'

import Animal from './animal.model.js'
import { checkUpdateAnimal } from '../utils/validator.js'

export const newAnimal = async(req, res)=>{
    try{
        let data = req.body
        let animal = Animal(data)
        await animal.save()
        return res.send({message: 'Animal registered succesfully'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error registering animal', err})
    }
}

export const updateAnimal = async(req, res)=>{
    try{
        let { id } = req.params
        let data = req.body
        let update = checkUpdateAnimal(data, id)
        if(!update) return res.status(400).send({message: 'Missing data'})
        let updatedAnimal = await Animal.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
        )
        if(!updatedAnimal) return res.status(401).send({message: 'Animal not found and not updated'})
        return res.send({message: 'Updated animal', updatedAnimal})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error updating animal'})
    }
}

export const buscarAnimal = async(req, res)=>{
    try{
        let { name } = req.body
        let animal = await Animal.findOne({name})
        if(animal){
            return res.send({message: `Animal ${animal.name}, type: ${animal.type}, age: ${animal.age}, keeper: ${animal.user_id}`})
        }
        return res.status(404).send({message: 'Animal not founded'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Search failed'})
    }
}

export const eliminarAnimal = async(req, res)=>{
    try{
        let { id } = req.params
        let deletedAnimal = await Animal.findOneAndDelete({_id: id})
        if(!deletedAnimal) return res.status(404).send({message: 'Animal not found and not deleted'})
        return res.send({message: `Animal ${deletedAnimal.name} delete succesfully`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error deleting animal'})
    }
}

export const getAnimals = async () => {
    return Animal.find({});
};