import React, { useEffect, useState } from "react";
import patientsData from "../api/patients.json";

const DoctorDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [calledPatients, setCalledPatients] = useState([]);
  useEffect(() => {
    // Simulate API call delay
    setTimeout(() => {
      setPatients(patientsData);
    }, 500);
  }, []);

  const callPatient = (patient) => {
    const timestamp = new Date();

    const socket = new WebSocket("ws://localhost:3000");
    socket.onopen = () => {
      socket.send(JSON.stringify({ patient, department: patient.department }));
      socket.close();
    };

    setCalledPatients((prev) => [
      { ...patient, calledAt: timestamp },
      ...prev.slice(0, 9),
    ]);
  };

  return (
    <div className="p-8 space-y-6 bg-gray-50 min-h-screen text-gray-800">
      <h1 className="text-3xl font-bold">Doctor Dashboard</h1>

      <div>
        <h2 className="text-xl font-semibold">Waiting Patients</h2>
        <ul className="space-y-2">
          {patients.map((p) => (
            <li
              key={p.id}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >
              <span>
                {p.name} - Room {p.room} - Department: {p.department}
              </span>

              <button
                onClick={() => callPatient(p)}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Call
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold">Call History</h2>
        <ul className="space-y-1">
          {calledPatients.map((p, idx) => (
            <li key={idx} className="text-sm text-gray-600">
              {p.name} at {new Date(p.calledAt).toLocaleTimeString()}
            </li>
          ))}
        </ul>
        <h2>Analytics</h2>
        <p>Total Patients Called: {calledPatients.length}</p>

        <p>
          Average Wait Time (simulated):{" "}
          {(() => {
            if (calledPatients.length === 0) return "N/A";
            const totalWait = calledPatients.reduce((sum, p) => {
              const wait = Math.floor(Math.random() * 10) + 1; // simulate 1–10 min
              return sum + wait;
            }, 0);
            return `${(totalWait / calledPatients.length).toFixed(1)} minutes`;
          })()}
        </p>
      </div>
    </div>
  );
};

export default DoctorDashboard;
