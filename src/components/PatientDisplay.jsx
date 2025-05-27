import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const PatientDisplay = ({ department }) => {
  const [currentPatient, setCurrentPatient] = useState(null);

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3000");

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      // Only accept messages meant for this department
      if (data.department === department) {
        setCurrentPatient(data.patient);
        speak(
          `Patient ${data.patient.name}, please go to room ${data.patient.room}`
        );
      }
    };

    return;
  }, [department]);

  return (
    <motion.div
      // key={currentPatient.id}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white p-4 rounded shadow flex justify-between items-center"
    >
      <div
        style={{ textAlign: "center", paddingTop: "100px", fontSize: "2rem" }}
      >
        <h1>{department.toUpperCase()} SCREEN</h1>
        {currentPatient ? (
          <>
            <p>
              <strong>{currentPatient.name}</strong>
            </p>
            <p>Room: {currentPatient.room}</p>
          </>
        ) : (
          <p>No patient currently being called.</p>
        )}
      </div>
    </motion.div>
  );
};

export default PatientDisplay;
