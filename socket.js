"use client";

 const io = require("socket.io-client")
// export const socket = io();

//import { io } from "socket.io-client";

export const socket = io(process.env.CLOUD_RUN_SOCKET_SERVER_URL); 

socket.on("connect", () => {
  console.log("Connected to Socket.IO server");
});

socket.on("message", (msg) => {
  console.log("Received message:", msg);
});
