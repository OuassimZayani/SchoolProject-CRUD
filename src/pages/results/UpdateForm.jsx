import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { useResults } from '../../ResultsContext';

const UpdateResultForm = ({ result, onClose }) => {
    const { updateResult } = useResults();
    const [moduleName, setModuleName] = useState(result.moduleName);
    const [examName, setExamName] = useState(result.examName);
    const [grade, setGrade] = useState(result.grade);

    useEffect(() => {
        setModuleName(result.moduleName);
        setExamName(result.examName);
        setGrade(result.grade);
    }, [result]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedResult = {
            ...result,
            moduleName: moduleName,
            examName: examName,
            grade: grade
        };
        updateResult(updatedResult);
        onClose();
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Update Result</h2>
                <form onSubmit={handleSubmit}>
                    <label>Module Name:</label>
                    <input type="text" value={moduleName} onChange={(e) => setModuleName(e.target.value)} required />
                    <label>Exam Name:</label>
                    <input type="text" value={examName} onChange={(e) => setExamName(e.target.value)} required />
                    <label>Grade:</label>
                    <input type="text" value={grade} onChange={(e) => setGrade(e.target.value)} required />
                    <Button type="submit" variant="contained" color="primary">Update</Button>
                </form>
            </div>
        </div>
    );
};

export default UpdateResultForm;
