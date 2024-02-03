import mongoose from 'mongoose';

// User Handling Schema
const userSchema = mongoose.Schema({
    username : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    }
})

const Users = mongoose.model('Users', userSchema)

export default Users