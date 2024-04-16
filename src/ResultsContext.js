import React, { createContext, useState, useContext, useEffect } from 'react';
import resultsData from './Data/results.json';

// Create context for results
const ResultsContext = createContext();

// Provider component for managing results data
export const ResultsProvider = ({ children }) => {
  const [results, setResults] = useState([]);

  // Function to fetch results data from JSON file
  const fetchResultsData = () => {
    try {
      // Set the fetched results data directly from the imported JSON file
      setResults(resultsData.map((result, index) => ({ ...result, id: index + 1 })));
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch results data on component mount
  useEffect(() => {
    fetchResultsData();
  }, []);

  // Function to calculate the number of results
  const calculateResultsNumber = () => {
    return results.length;
  };

  // Function to add a new result
  const addResult = (newResult) => {
    const newId = results.length + 1; // Generate a new unique ID
    setResults([...results, { ...newResult, id: newId }]);
  };

  // Function to update an existing result
  const updateResult = (updatedResult) => {
    setResults(results.map((result) => (result.id === updatedResult.id ? updatedResult : result)));
  };

  // Function to delete a result
  const deleteResult = (resultId) => {
    setResults(results.filter((result) => result.id !== resultId));
  };

  return (
    <ResultsContext.Provider value={{ results, calculateResultsNumber, addResult, updateResult, deleteResult }}>
      {children}
    </ResultsContext.Provider>
  );
};

// Custom hook to access results context
export const useResults = () => useContext(ResultsContext);
