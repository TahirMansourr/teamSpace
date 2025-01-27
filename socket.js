"use client";

 const io = require("socket.io-client")

export const socket = io(process.env.CLOUD_RUN_SOCKET_SERVER_URL); 

socket.on("connect", () => {
  console.log("Server up and running");
});

export const JoinRoom = (roomName, username) => {
  socket.emit("joinRoom", { roomName, username }, (ack) => {
    console.log('🐱🐱🐱🐱🐱🐱🐱🐱🐱🐱🐱🐱🐱🐱🐱🐱🐱🐱🐱 ' , roomName);
    if (ack.success) {
      console.log(`${username} joined room: ${roomName}`);
    } else {
      console.log(`Failed to join room: ${roomName}`);
    }
  });
};
