import Products from "../model/productCategory.js";

// CRUD Operation - Product Category

export const createProduct = async (request, response) => {
    const { title } = request.body;
    try {
        const newProduct = new Products({ title });
        await newProduct.save();
        response.json(newProduct);
    } catch (error) {
        response.status(500).json({ message: 'Error creating product' });
    }
}

export const getProducts = async (request, response) => {
    try {
        const products = await Products.find();
        response.json(products);
    } catch (error) {
        response.status(500).json({ message: 'Error fetching products' });
    }
}

export const updateProduct = async (request, response) => {
    const id = request.params.id
    try {
        const updatedProduct = await Products.findByIdAndUpdate(id, request.body, { new: true });
        response.json(updatedProduct);
    } catch (error) {
        response.status(500).json({ message: 'Error updating product' });
    }
}

export const deleteProduct = async (request, response) => {
    const id = request.params.id
    try {
        await Products.findByIdAndDelete(id);
        response.json({ message: 'Product deleted successfully' });
    } catch (error) {
        response.status(500).json({ message: 'Error deleting product' });
    }
}

