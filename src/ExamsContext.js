import React, { createContext, useState, useContext, useEffect } from 'react';
import examsData from './Data/exams.json';

// Create context for exams
const ExamsContext = createContext();

// Provider component for managing exams data
export const ExamsProvider = ({ children }) => {
  const [exams, setExams] = useState([]);
  const [lastUsedId, setLastUsedId] = useState(0); // Initialize the last used ID

  // Function to fetch exams data from JSON file
  const fetchExamsData = () => {
    try {
      // Set the fetched exams data directly from the imported JSON file
      setExams(examsData);
      // Find the maximum ID in the existing exams data
      const maxId = Math.max(...examsData.map((exam) => exam.id));
      // Set the last used ID to the maximum ID
      setLastUsedId(maxId);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch exams data on component mount
  useEffect(() => {
    fetchExamsData();
  }, []);

  // Function to calculate the number of exams
  const calculateExamsNumber = () => {
    return exams.length;
  };

  // Function to generate a new ID for the next exam
  const generateNewId = () => {
    // Increment the last used ID by one to get the ID for the new exam
    return lastUsedId + 1;
  };

  // Function to add a new exam
  const addExam = (newExam) => {
    const newId = exams.length + 1; // Generate a new unique ID
    setExams([...exams, { ...newExam, id: newId }]);
  };



  // Function to update an exam by ID
  const updateExam = (id, updatedExam) => {
    setExams(exams.map((exam) => (exam.id === id ? updatedExam : exam)));
  };

  // Function to delete an exam by ID
  const deleteExam = (id) => {
    setExams(exams.filter((exam) => exam.id !== id));
  };

  return (
    <ExamsContext.Provider value={{ exams, addExam, updateExam, deleteExam, calculateExamsNumber }}>
      {children}
    </ExamsContext.Provider>
  );
};

// Custom hook to access exams context
export const useExams = () => useContext(ExamsContext);
