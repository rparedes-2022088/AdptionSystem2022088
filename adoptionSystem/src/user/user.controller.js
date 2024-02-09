'use strict'

import User from './user.model.js' //solo el modelo puede ir con mayus
import { encrypt, checkPassword, checkUpdate } from '../utils/validator.js'

export const test = (req, res)=>{
    return res.send('Hello world')
}

export const register = async(req, res)=>{ //solo para clientes
    try{
        //Capturar la información del cliente(body)
        let data = req.body
        console.log(data)
        //encriptar la contraseña
        data.password = await encrypt(data.password)
        //Asignar rol por defecto Client
        data.role = 'CLIENT' //si viene con otro valor o no viene lo asigna a rol cliente
        //Crear instancia del modelo
        let user = User(data)
        //Guardar la información
        await user.save()
        //Respondo al usuario
        return res.send({message: 'Registered succesfully'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error registering user', err})
    }
}

export const login = async(req, res)=>{
    try{
        //Capturar la información
        let { username, password } = req.body
        //Validar que el usuario existe
        let user = await User.findOne({ username })
        //Verifica que la contraseña coincida
        if(user && await checkPassword(password, user.password)){
            let loggedUser = {
                username: user.username,
                name: user.name,
                role: user.role
            }
            //dar acceso
            return res.send({message: `Welcome ${user.name}`, loggedUser})
        }
        return res.status(404).send({message: 'Invalid credentials'}) //por seguridad no dar que fue lo que fallo
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Failed to login'})
    }
}

export const update = async(req, res)=>{ //usuario logeado
    try{
        //Obtener el id del usuario a actualizar
        let { id } = req.params
        //Obtener los datos que se van a actualizar
        let data = req.body
        //Validar si trae datos a actualizar
        let update = checkUpdate(data, id)
        if(!update) return res.status(400).send({message: 'Have submitted some data that cannot be updated or missing data'})
        //Validar si tiene permisos para actualizar (Tokenizacion)
        //Actualizamos en la DB
        let updatedUser = await User.findOneAndUpdate(
            {_id: id}, //objetID hexadecimal (hora sys, version mongo, llave privada)
            data, //datos que va a actualizar
            {new: true} //objeto de la DB ya actualizado
        )
        //Validar si se actualizó
        if(!updatedUser) return res.status(401).send({message: 'User not found and not updated'})
        //Responder con el dato actualizado
        return res.send({message: 'Updated user', updatedUser})
    }catch(err){
        console.error(err)
        if(err.keyValue.username) return res.status(400).send({message: `Username ${err.keyValue.username} is alredy taken`})
        return res.status(500).send({message: 'Error updating account'})
    }
}

export const deleteU = async(req, res)=>{
    try{
        //Obtener el id
        let { id } = req.params
        //Validar si está logeado y es el mismo
        //Eliminar (deleteOne)(findOneAndDelete)
        let deletedUser = await User.findOneAndDelete({_id: id})
        //Verificar que se eliminó
        if(!deletedUser) return res.status(404).send({message: 'Account not found and not deleted'})
        //Responder
        return res.send({message: `Account with username ${deletedUser.username} delete succesfully`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error deleting account'})
    }
}