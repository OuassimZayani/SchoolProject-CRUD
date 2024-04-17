import React, { createContext, useState, useContext, useEffect } from 'react';
import modulesData from './Data/modules.json';

// Create context for modules
const ModulesContext = createContext();

// Provider component for managing modules data
export const ModulesProvider = ({ children }) => {
  const [modules, setModules] = useState([]);

  // Function to fetch modules data from JSON file
  const fetchModulesData = () => {
    try {
      // Set the fetched modules data directly from the imported JSON file
      setModules(modulesData);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch modules data on component mount
  useEffect(() => {
    fetchModulesData();
  }, []);

  // Function to calculate the number of modules
  const calculateModulesNumber = () => {
    return modules.length;
  };

  // Function to add a new module
  const addModule = (newModule) => {
    const newId = modules.length + 1; // Generate a new unique ID
    setModules([...modules, { ...newModule, id: newId }]);
  };

  // Function to update a module by ID
  const updateModule = (id, updatedModule) => {
    setModules(modules.map(module => (module.id === id ? updatedModule : module)));
  };

  // Function to delete a module by ID
  const deleteModule = (id) => {
    setModules(modules.filter(module => module.id !== id));
  };

  return (
    <ModulesContext.Provider value={{ modules, addModule, updateModule, deleteModule, calculateModulesNumber }}>
      {children}
    </ModulesContext.Provider>
  );
};

// Custom hook to access modules context
export const useModules = () => useContext(ModulesContext);
