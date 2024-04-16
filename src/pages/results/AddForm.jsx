import React, { useState } from 'react';
import './AddForm.css'; // Import CSS file for styling
import { useResults } from '../../ResultsContext'; // Import the ResultsContext

export default function AddResultForm({ onClose }) {
    const { addResult } = useResults(); // Access the addResult function from the ResultsContext
    const [moduleName, setModuleName] = useState('');
    const [examName, setExamName] = useState('');
    const [grade, setGrade] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Create a new result object
        const newResult = {
            id: Math.floor(Math.random() * 1000), // Generate a random ID for simplicity
            moduleName,
            examName,
            grade,
        };
        addResult(newResult); // Add the new result using the addResult function
        onClose(); // Close the form after submission
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Add New Result</h2>
                <form onSubmit={handleSubmit}>
                    <label>Module Name:</label>
                    <input type="text" value={moduleName} onChange={(e) => setModuleName(e.target.value)} required />
                    <label>Exam Name:</label>
                    <input type="text" value={examName} onChange={(e) => setExamName(e.target.value)} required />
                    <label>Grade:</label>
                    <input type="text" value={grade} onChange={(e) => setGrade(e.target.value)} required />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};
