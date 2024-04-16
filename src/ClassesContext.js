import React, { createContext, useState, useContext, useEffect } from 'react';
import classesData from './Data/classes.json';

// Create context for classes
const ClassesContext = createContext();

// Provider component for managing classes data
export const ClassesProvider = ({ children }) => {
  const [classes, setClasses] = useState([]);

  // Function to fetch classes data from JSON file
  const fetchClassesData = () => {
    try {
      // Set the fetched classes data directly from the imported JSON file
      setClasses(classesData);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch classes data on component mount
  useEffect(() => {
    fetchClassesData();
  }, []);

  // Function to calculate the number of classes
  const calculateClassesNumber = () => {
    return classes.length;
  };

  return (
    <ClassesContext.Provider value={{ classes, calculateClassesNumber }}>
      {children}
    </ClassesContext.Provider>
  );
};

// Custom hook to access classes context
export const useClasses = () => useContext(ClassesContext);
