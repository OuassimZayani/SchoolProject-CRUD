import React, { useState } from 'react';
import './AddForm.css'; // Import CSS file for styling
import { useExams } from '../../ExamsContext'; // Import the ExamsContext

export default function AddExamForm({ onClose }) {
    const { addExam } = useExams(); // Access the addExam function from the ExamsContext
    const [examName, setExamName] = useState('');
    const [moduleName, setModuleName] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Create a new exam object
        const newExam = {
            id: Math.floor(Math.random() * 1000), // Generate a random ID for simplicity
            name: examName,
            moduleName: moduleName,
            date: date,
            description: description,
        };
        addExam(newExam); // Add the new exam using the addExam function
        onClose(); // Close the form after submission
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Add New Exam</h2>
                <form onSubmit={handleSubmit}>
                    <label>Exam Name:</label>
                    <input type="text" value={examName} onChange={(e) => setExamName(e.target.value)} required />
                    <label>Module Name:</label>
                    <input type="text" value={moduleName} onChange={(e) => setModuleName(e.target.value)} required />
                    <label>Date:</label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                    <label>Description:</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

