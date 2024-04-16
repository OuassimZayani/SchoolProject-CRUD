import React, { createContext, useState, useContext, useEffect } from 'react';
import eventsData from './Data/events.json';

// Create context for events
const EventsContext = createContext();

// Provider component for managing events data
export const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  // Function to fetch events data from JSON file
  const fetchEventsData = () => {
    try {
      // Set the fetched events data directly from the imported JSON file
      setEvents(eventsData);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch events data on component mount
  useEffect(() => {
    fetchEventsData();
  }, []);

  return (
    <EventsContext.Provider value={{ events }}>
      {children}
    </EventsContext.Provider>
  );
};

// Custom hook to access events context
export const useEvents = () => useContext(EventsContext);
