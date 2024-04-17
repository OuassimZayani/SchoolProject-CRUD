import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion"; // Import motion, AnimatePresence, and useAnimation from Framer Motion
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import exams from "../../Data/exams.json";
import { Link } from "react-router-dom";
import "./calendar.scss";

export default function Calendar() {
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const controls = useAnimation(); // Create animation controls

  useEffect(() => {
    controls.start({ scale: 1 }); // Start modal scale-up animation on mount
  }, [controls]);

  const events = exams.map((exam) => ({
    title: exam.name,
    date: exam.date,
    description: exam.description,
  }));

  const handleEventClick = (info) => {
    setSelectedEvent(info.event);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    controls.start({ scale: 0 }); // Start modal scale-down animation on close
    setTimeout(() => setShowModal(false), 300); // Hide modal after animation duration (300ms)
  };

  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={handleEventClick}
      />
      <Link to="/dashboard">
        <p className="back">Back to dashboard</p>
      </Link>
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="modal"
            initial={{ scale: 0 }} // Set initial scale to 0 for animation
            animate={{ scale: 1 }} // Animate scale to 1 for modal scale-up effect
            exit={{ scale: 0 }} // Animate scale to 0 for modal scale-down effect
            transition={{ duration: 0.3 }} // Set animation duration to 0.3 seconds
          >
            <div className="modal-content">
              <span className="close" onClick={handleCloseModal}>
                &times;
              </span>
              <h2>{selectedEvent && selectedEvent.title}</h2>
              <p>{selectedEvent && selectedEvent.extendedProps.description}</p>
              <button onClick={handleCloseModal}>Close</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
