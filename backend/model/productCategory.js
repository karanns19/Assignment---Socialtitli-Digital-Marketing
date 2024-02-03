import mongoose from 'mongoose';

// Product Category Schema
const productsSchema = mongoose.Schema({
    title : {
        type: String,
        required: true
    },
})

const Products = mongoose.model('Products', productsSchema)

export default Products