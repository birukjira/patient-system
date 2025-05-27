import express from "express";
import { WebSocketServer } from "ws";
import http from "http";

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("Client connected");

  // ws.on("message", (message) => {
  //   console.log("Broadcasting:", message);
  //   // Broadcast to all clients except sender
  //   wss.clients.forEach((client) => {
  //     if (client !== ws && client.readyState === ws.OPEN) {
  //       client.send(message);
  //     }
  //   });
  // });

  ws.on("message", (message) => {
    const dataStr = message.toString(); // Convert Buffer to string
    console.log("Broadcasting:", dataStr);

    // Optional: parse it to JSON if needed
    // const data = JSON.parse(dataStr);

    // Broadcast to all other clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === ws.OPEN) {
        client.send(dataStr);
      }
    });
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

server.listen(3000, () => {
  console.log("WebSocket server running at ws://localhost:3000");
});
