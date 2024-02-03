import Roles from "../model/roleCategory.js";

// CRUD Operation - Role Category

export const createRole = async (request, response) => {
    const { role, permissions } = request.body;
    try {
        const newRole = new Roles({ role, permissions });
        await newRole.save();
        response.json(newRole);
    } catch (error) {
        response.status(500).json({ message: 'Error creating role' });
    }
}

export const getRoles = async (request, response) => {
    try {
        const roles = await Roles.find();
        response.json(roles);
    } catch (error) {
        response.status(500).json({ message: 'Error fetching roles' });
    }
}

export const updateRole = async (request, response) => {
    const id = request.params.id
    try {
        const updatedRole = await Roles.findByIdAndUpdate(id, request.body, { new: true });
        response.json(updatedRole);
    } catch (error) {
        response.status(500).json({ message: 'Error updating role' });
    }
}

export const deleteRole = async (request, response) => {
    const id = request.params.id
    try {
        await Roles.findByIdAndDelete(id);
        response.json({ message: 'Role deleted successfully' });
    } catch (error) {
        response.status(500).json({ message: 'Error deleting role' });
    }
}

