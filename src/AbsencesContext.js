import React, { createContext, useState, useContext, useEffect } from 'react';
import absencesData from './Data/absences.json';

// Create context for absences
const AbsencesContext = createContext();

// Provider component for managing absences data
export const AbsencesProvider = ({ children }) => {
  const [absences, setAbsences] = useState([]);

  // Function to fetch absences data from JSON file
  const fetchAbsencesData = () => {
    try {
      // Set the fetched absences data directly from the imported JSON file
      setAbsences(absencesData);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch absences data on component mount
  useEffect(() => {
    fetchAbsencesData();
  }, []);

  return (
    <AbsencesContext.Provider value={{ absences }}>
      {children}
    </AbsencesContext.Provider>
  );
};

// Custom hook to access absences context
export const useAbsences = () => useContext(AbsencesContext);
