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

const Users = () => {
    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:3001/users');
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleAddUser = async () => {
        try {
            const response = await fetch('http://localhost:3001/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            const newUser = await response.json();
            setUsers([...users, newUser]);
            setOpen(false);
            setUsername('');
            setPassword('');
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            await fetch(`http://localhost:3001/users/${id}`, { method: 'DELETE' });
            setUsers(users.filter(user => user._id !== id));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleEditUser = async (id, newData) => {
        try {
            const response = await fetch(`http://localhost:3001/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newData),
            });
            const updatedUser = await response.json();
            setUsers(users.map(user => (user._id === id ? updatedUser : user)));
            setEditId(null);
            setOpen(false);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleOpenDialog = () => {
        setOpen(true);
        setUsername('');
        setPassword('');
    };

    const handleCloseDialog = () => {
        setOpen(false);
        setUsername('');
        setPassword('');
        setEditId(null);
    };
    return (
        <div>
            <Button variant="contained" onClick={handleOpenDialog}>Add User</Button>
            <Dialog open={open} onClose={handleCloseDialog}>
                <DialogTitle>{editId ? 'Edit User' : 'Add User'}</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        label="Password"
                        type="text"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={editId ? () => handleEditUser(editId, { username, password }) : handleAddUser}>
                        {editId ? 'Save' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
            <ol>
                {users.map(user => (
                    <li key={user._id} style={{ padding: '10px' }}>
                        <span style={{ width: '250px', display: 'inline-block' }}>Username : {user.username}</span>
                        <span style={{ width: '250px', display: 'inline-block' }}>Password : {user.password}</span>
                        <IconButton onClick={() => { setEditId(user._id); setUsername(user.username); setPassword(user.password); setOpen(true); }}>
                            <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteUser(user._id)}>
                            <DeleteIcon />
                        </IconButton>
                    </li>
                ))}
            </ol>
        </div>
    )
}

export default Users