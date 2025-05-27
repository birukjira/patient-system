import React, { useEffect, useState } from "react";

const DoctorDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Sample patient queue
    const dummyPatients = [
      { id: 1, name: "Ayan Mohamed", room: "101" },
      { id: 2, name: "Tadesse Alemu", room: "102" },
      { id: 3, name: "Fatuma Yusuf", room: "103" },
    ];
    setPatients(dummyPatients);

    const ws = new WebSocket("ws://localhost:3000");
    setSocket(ws);

    return () => ws.close();
  }, []);

  const handleCall = (patient) => {
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ patient }));
      // alert(`Patient called: ${patient.name}`);
    } else {
      alert("WebSocket not connected");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Doctor's Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Room</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.room}</td>
              <td>
                <button onClick={() => handleCall(p)}>Call</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorDashboard;
