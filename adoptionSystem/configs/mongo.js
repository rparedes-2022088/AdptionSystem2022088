//configuración de conexión a mongoDB
'use strict'

import mongoose from "mongoose"

export const connect = async()=>{
    try{
        mongoose.connection.on('error', ()=>{
            console.log('MongoDB | could not be connect to mongoDB')
            mongoose.disconnect()
        })

        mongoose.connection.on('connecting', ()=>{console.log('MongoDB | Try connecting')})
        mongoose.connection.on('connected', ()=>{console.log('MongoDB | connected to Mongodb')})
        mongoose.connection.on('open', ()=>{console.log('MongoDB | connected to database')})
        mongoose.connection.on('disconnected', ()=>{console.log('MongoDB | disconnected')})
        mongoose.connection.on('reconnected', ()=>{console.log('MongoDB | reconnected to MongoDB')})

        return await mongoose.connect('mongodb://127.0.0.1:27017/AdoptionSystemAV24')
    }catch(err){
        console.error('Database connection failed', err)
    }
}