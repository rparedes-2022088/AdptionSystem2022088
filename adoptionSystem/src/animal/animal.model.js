import mongoose from "mongoose"
import User from "../user/user.model.js"

const animalSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

export default mongoose.model('animal', animalSchema)