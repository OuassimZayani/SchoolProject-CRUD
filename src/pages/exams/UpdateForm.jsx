import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { useExams } from '../../ExamsContext'; // Import the ExamsContext

const UpdateExamForm = ({ exam, onClose }) => {
    const { updateExam } = useExams(); // Access the updateExam function from the ExamsContext
    const [examName, setExamName] = useState(exam.name);
    const [moduleName, setModuleName] = useState(exam.moduleName);
    const [date, setDate] = useState(exam.date);
    const [description, setDescription] = useState(exam.description);

    useEffect(() => {
        // Update form fields when the exam prop changes
        setExamName(exam.name);
        setModuleName(exam.moduleName);
        setDate(exam.date);
        setDescription(exam.description);
    }, [exam]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Create an updated exam object
        const updatedExam = {
            ...exam,
            name: examName,
            moduleName: moduleName,
            date: date,
            description: description,
        };
        updateExam(exam.id, updatedExam); // Update the exam using the updateExam function
        onClose(); // Close the form after submission
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Update Exam</h2>
                <form onSubmit={handleSubmit}>
                    <label>Exam Name:</label>
                    <input type="text" value={examName} onChange={(e) => setExamName(e.target.value)} required />
                    <label>Module Name:</label>
                    <input type="text" value={moduleName} onChange={(e) => setModuleName(e.target.value)} required />
                    <label>Date:</label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                    <label>Description:</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                    <Button type="submit" variant="contained" color="primary">Update</Button>
                </form>
            </div>
        </div>
    );
};

export default UpdateExamForm;
