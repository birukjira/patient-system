import React, { useEffect, useState } from "react";

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
      console.log("Received data:", data.patient.name, data.patient.room);

      // Only accept messages meant for this department
      if (data.department === department) {
        setCurrentPatient(data.patient);
        speak(
          `Patient ${data.patient.name}, please go to room ${data.patient.room}`
        );
      }
    };

    return () => {
      socket.close();
    };
  }, [department]);

  return (
    <div style={{ textAlign: "center", paddingTop: "100px", fontSize: "2rem" }}>
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
  );
};

export default PatientDisplay;
