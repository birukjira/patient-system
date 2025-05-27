import React, { useEffect, useState } from "react";

const PatientDisplay = () => {
  const [currentPatient, setCurrentPatient] = useState(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3000");

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setCurrentPatient(data.patient);
    };

    return () => socket.close();
  }, []);

  return (
    <div style={{ textAlign: "center", paddingTop: "100px", fontSize: "2rem" }}>
      <h1>Now Serving</h1>
      {currentPatient ? (
        <div>
          <p>
            <strong>{currentPatient.name}</strong>
          </p>
          <p>Room: {currentPatient.room}</p>
        </div>
      ) : (
        <p>No patient is currently being called.</p>
      )}
    </div>
  );
};

export default PatientDisplay;
