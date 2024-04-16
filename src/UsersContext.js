import React, { createContext, useState, useContext, useEffect } from 'react';
import userData from './Data/users.json';

// Create context for users
const UsersContext = createContext();

// Custom hook to access users context
export const useUsers = () => useContext(UsersContext);

// Provider component for managing users data
export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  // Function to fetch users data from JSON file
  const fetchUsersData = () => {
    try {
      // Set the fetched user data directly from the imported JSON file
      setUsers(userData);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch users data on component mount
  useEffect(() => {
    fetchUsersData();
  }, []);

  // Function to add a new user
  const addUser = (newUser) => {
    setUsers([...users, newUser]);
  };

  // Function to update an existing user
  const updateUser = (userId, updatedUser) => {
    // Map over the users array
    const updatedUsers = users.map(user => {
      // If the user id matches, merge the updatedUser with the existing user object
      if (user.id === userId) {
        return { ...user, ...updatedUser };
      }
      // Otherwise, return the original user object
      return user;
    });

    // Set the updated users array as the new state
    setUsers(updatedUsers);

    // Store updated users data in localStorage
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    // Store updated user data in localStorage
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  // Function to delete a user
  const deleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  return (
    <UsersContext.Provider value={{ users, addUser, updateUser, deleteUser }}>
      {children}
    </UsersContext.Provider>
  );
};


