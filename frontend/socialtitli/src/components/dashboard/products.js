import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:3001/products');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleAddProduct = async () => {
        try {
            const response = await fetch('http://localhost:3001/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title }),
            });
            const newProduct = await response.json();
            setProducts([...products, newProduct]);
            setOpen(false);
            setTitle('');
        } catch (error) {
            console.error('Error adding title:', error);
        }
    };

    const handleDeleteProduct = async (id) => {
        try {
            await fetch(`http://localhost:3001/products/${id}`, { method: 'DELETE' });
            setProducts(products.filter(product => product._id !== id));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleEditProduct = async (id, newData) => {
        try {
            const response = await fetch(`http://localhost:3001/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newData),
            });
            const updatedProduct = await response.json();
            setProducts(products.map(product => (product._id === id ? updatedProduct : product)));
            setEditId(null);
            setOpen(false);
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const handleOpenDialog = () => {
        setOpen(true);
        setTitle('');
    };

    const handleCloseDialog = () => {
        setOpen(false);
        setTitle('');
        setEditId(null);
    };
    return (
        <div>
            <Button variant="contained" onClick={handleOpenDialog}>Add Product</Button>
            <Dialog open={open} onClose={handleCloseDialog}>
                <DialogTitle>{editId ? 'Edit Product' : 'Add Product'}</DialogTitle>
                <DialogContent>
                    <TextField
                        label="title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={editId ? () => handleEditProduct(editId, { title }) : handleAddProduct}>
                        {editId ? 'Save' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
            <ol>
                {products.map(product => (
                    <li key={product._id} style={{ padding: '10px' }}>
                        <span style={{ width: '250px', display: 'inline-block' }}>Title : {product.title}</span>
                        <IconButton onClick={() => { setEditId(product._id); setTitle(product.title); setOpen(true); }}>
                            <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteProduct(product._id)}>
                            <DeleteIcon />
                        </IconButton>
                    </li>
                ))}
            </ol>
        </div>
    )
}

export default Products