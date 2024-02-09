import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true, //solo puede existir un registro único
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        minLenght: [8, 'Password must be 8 characters'],
        required: true
    },
    phone: {
        type: String,
        minLenght: 8,
        maxLenght: 8,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    role: {
        type: String,
        uppercase: true,
        enum: ['ADMIN','CLIENT'], //solo los datos que esten en el array son validos
        required: true
    }
})

export default mongoose.model('user', userSchema)

//Pre mongoose