import Users from '../model/users.js';

// CRUD Operation - Users Handling

export const createUser = async (request, response) => {
    const { username, password } = request.body;
    try {
        const newUser = new Users({ username, password });
        await newUser.save();
        response.json(newUser);
    } catch (error) {
        response.status(500).json({ message: 'Error creating user' });
    }
}

export const getUsers = async (request, response) => {
    try {
        const users = await Users.find();
        response.json(users);
    } catch (error) {
        response.status(500).json({ message: 'Error fetching users' });
    }
}

export const updateUsers = async (request, response) => {
    const id = request.params.id
    try {
        const updatedUser = await Users.findByIdAndUpdate(id, request.body, { new: true });
        response.json(updatedUser);
    } catch (error) {
        response.status(500).json({ message: 'Error updating user' });
    }
}

export const deleteUser = async (request, response) => {
    const id = request.params.id
    try {
        await Users.findByIdAndDelete(id);
        response.json({ message: 'User deleted successfully' });
    } catch (error) {
        response.status(500).json({ message: 'Error deleting user' });
    }
}

