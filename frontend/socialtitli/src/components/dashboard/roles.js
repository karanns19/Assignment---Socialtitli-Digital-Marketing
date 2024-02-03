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

const Roles = () => {
    const [roles, setRoles] = useState([]);
    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false);
    const [role, setRole] = useState('');
    const [editId, setEditId] = useState(null);
    const [permissionState, setPermissionState] = useState([]);

    useEffect(() => {
        fetchProducts();
        fetchRoles();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:3001/products');
            const data = await response.json();
            setProducts(data);
            const initialPermissionState = data.map(product => ({
                productId: product.id,
                permissions: {
                    read: false,
                    write: false,
                    create: false
                }
            }));
            setPermissionState(initialPermissionState);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const fetchRoles = async () => {
        try {
            const response = await fetch('http://localhost:3001/roles');
            const data = await response.json();
            setRoles(data);
        } catch (error) {
            console.error('Error fetching roles:', error);
        }
    };

    const handleAddRole = async () => {
        try {
            const roleData = {
                role,
                permissions: permissionState.map(item => ({
                    productId: item.productId,
                    productName: products.find(product => product.id === item.productId)?.title,
                    permissions: item.permissions
                }))
            };

            const response = await fetch('http://localhost:3001/roles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(roleData),
            });

            const newRole = await response.json();
            setRoles([...roles, newRole]);
            setOpen(false);
            setRole('');
            clearPermissionState();
        } catch (error) {
            console.error('Error adding role:', error);
        }
    };

    const handleEditRole = async (id) => {
        try {
            const editedRole = roles.find(role => role._id === id);
            const roleData = {
                role: editedRole.role,
                permissions: permissionState.map(item => ({
                    productId: item.productId,
                    productName: products.find(product => product.id === item.productId)?.title,
                    permissions: item.permissions
                }))
            };

            const response = await fetch(`http://localhost:3001/roles/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(roleData),
            });

            const updatedRole = await response.json();
            setRoles(roles.map(role => (role._id === id ? updatedRole : role)));
            setEditId(null);
            setOpen(false);
        } catch (error) {
            console.error('Error updating role:', error);
        }
    };


    const handleDeleteRole = async (id) => {
        try {
            await fetch(`http://localhost:3001/roles/${id}`, { method: 'DELETE' });
            setRoles(roles.filter(role => role._id !== id));
        } catch (error) {
            console.error('Error deleting role:', error);
        }
    };

    const handleCheckboxChange = (productId, permission, isChecked) => {
        setPermissionState(prevState =>
            prevState.map(item => {
                if (item.productId === productId) {
                    // If the product ID matches, update its permissions
                    return {
                        ...item,
                        permissions: {
                            ...item.permissions,
                            [permission]: isChecked
                        }
                    };
                }
                return item;
            })
        );
    };


    const handleOpenDialog = () => {
        setOpen(true);
        setRole('');
        clearPermissionState();
    };

    const handleCloseDialog = () => {
        setOpen(false);
        setRole('');
        setEditId(null);
        clearPermissionState();
    };

    const clearPermissionState = () => {
        const clearedPermissionState = permissionState.map(item => ({
            productId: item.productId,
            permissions: {
                read: false,
                write: false,
                create: false
            }
        }));
        setPermissionState(clearedPermissionState);
    };

    return (
        <div>
            <Button variant="contained" onClick={handleOpenDialog}>Add Role</Button>
            <Dialog open={open} onClose={handleCloseDialog}>
                <DialogTitle>{editId ? 'Edit Role' : 'Add Role'}</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                    <h3>Role Permissions</h3>
                    {products.map(product => (
                        <div key={product.id} style={{ display: 'flex', alignItems: 'center', marginTop: '10px', marginBottom: '10px' }}>
                            <div style={{ marginRight: '10px' }}> <strong>{product.title}</strong></div>
                            <div style={{ marginRight: '10px', }}>
                                <input
                                    type="checkbox"
                                    id={`read-${product.id}`}
                                    checked={permissionState.find(item => item.productId === product.id)?.permissions.read || false}
                                    onChange={(e) => handleCheckboxChange(product.id, 'read', e.target.checked)}
                                />
                                <label htmlFor={`read-${product.id}`}>Read</label>
                            </div>
                            <div style={{ marginRight: '10px', }}>
                                <input
                                    type="checkbox"
                                    id={`write-${product.id}`}
                                    checked={permissionState.find(item => item.productId === product.id)?.permissions.write || false}
                                    onChange={(e) => handleCheckboxChange(product.id, 'write', e.target.checked)}
                                />
                                <label htmlFor={`write-${product.id}`}>Write</label>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    id={`create-${product.id}`}
                                    checked={permissionState.find(item => item.productId === product.id)?.permissions.create || false}
                                    onChange={(e) => handleCheckboxChange(product.id, 'create', e.target.checked)}
                                />
                                <label htmlFor={`create-${product.id}`}>Create</label>
                            </div>
                        </div>
                    ))}

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={editId ? () => handleEditRole(editId) : handleAddRole}>
                        {editId ? 'Save' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
            <ol>
                {roles.map(role => (
                    <li key={role._id} style={{ padding: '10px' }}>
                        <span style={{ width: '250px', display: 'inline-block' }}>Role : {role.role}</span>
                        <IconButton onClick={() => { setEditId(role._id); setRole(role.role);setPermissionState(role.permissions); setOpen(true); }}>
                            <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteRole(role._id)}>
                            <DeleteIcon />
                        </IconButton>
                    </li>
                ))}
            </ol>
        </div>
    )
}

export default Roles;
