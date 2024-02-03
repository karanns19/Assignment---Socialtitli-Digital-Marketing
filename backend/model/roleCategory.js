import mongoose from 'mongoose';

// Role Category Schema
const roleSchema = mongoose.Schema({
    role: {
        type: String,
        required: true
    },
    permissions: {
        type: Object,
        required: true
    }

})

const Roles = mongoose.model('Roles', roleSchema)

export default Roles