//validar diferentes datos

import { hash, compare } from 'bcrypt' //Algoritmo matematico para encriptar datos
//se recomienda entre 8 a 12 saltos

export const encrypt = async(password)=>{
    try{
        return await hash(password, 10)
    }catch(err){
        console.error(err)
        return err
    }
}

export const checkPassword = async(password, hash)=>{
    try{
        return await compare(password, hash)
    }catch(err){
        console.error(err)
        return err
    }
}

export const checkUpdate = (data, userId)=>{
    if(userId){
        if(
            Object.entries(data).length === 0 ||
            data.password ||
            data.password == '' ||
            data.role ||
            data.role == ''
        ) return false
        return true
    }else{
        return false
    }
}

export const checkUpdateAnimal = (data, animalId)=>{
    if(animalId){
        if(
            Object.entries(data).length === 0
        ) return false
        return true
    }else{
        return false
    }
}