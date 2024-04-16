import React, { useState } from 'react';
import { useModules } from '../../ModulesContext'; // Import the ModulesContext

const AddForm = ({ onClose }) => {
    const { addModule } = useModules(); // Access the addModule function from the ModulesContext
    const [moduleName, setModuleName] = useState('');
    const [instructor, setInstructor] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Create a new module object
        const newModule = {
            id: Math.floor(Math.random() * 1000), // Generate a random ID for simplicity
            name: moduleName,
            instructor: instructor,
            description: description,
        };
        addModule(newModule); // Add the new module using the addModule function
        onClose(); // Close the form after submission
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Add New Module</h2>
                <form onSubmit={handleSubmit}>
                    <label>Module Name:</label>
                    <input type="text" value={moduleName} onChange={(e) => setModuleName(e.target.value)} required />
                    <label>Instructor:</label>
                    <input type="text" value={instructor} onChange={(e) => setInstructor(e.target.value)} required />
                    <label>Description:</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AddForm;
