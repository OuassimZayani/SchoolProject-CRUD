import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { useModules } from '../../ModulesContext'; // Import the ModulesContext

const UpdateForm = ({ module, onClose }) => {
    const { updateModule } = useModules(); // Access the updateModule function from the ModulesContext
    const [moduleName, setModuleName] = useState(module.name);
    const [instructor, setInstructor] = useState(module.instructor);
    const [description, setDescription] = useState(module.description);

    useEffect(() => {
        // Update form fields when the module prop changes
        setModuleName(module.name);
        setInstructor(module.instructor);
        setDescription(module.description);
    }, [module]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Create an updated module object
        const updatedModule = {
            ...module,
            name: moduleName,
            instructor: instructor,
            description: description,
        };
        updateModule(module.id, updatedModule); // Update the module using the updateModule function
        onClose(); // Close the form after submission
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Update Module</h2>
                <form onSubmit={handleSubmit}>
                    <label>Module Name:</label>
                    <input type="text" value={moduleName} onChange={(e) => setModuleName(e.target.value)} required />
                    <label>Instructor:</label>
                    <input type="text" value={instructor} onChange={(e) => setInstructor(e.target.value)} required />
                    <label>Description:</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                    <Button type="submit" variant="contained" color="primary">Update</Button>
                </form>
            </div>
        </div>
    );
};

export default UpdateForm;
