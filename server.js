const { createServer } = require("node:http");
const next = require("next");
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const hostname = dev ? "localhost" : "team-space.vercel.app";
const port = process.env.PORT || 3000;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    socket.on("hello", (value) => {
      console.log("iwasclicked", value);
      io.emit("message", "hey");
    });
    socket.on("Groupmessage", (value) => {
      console.log("received", value);
      io.emit("Groupmessage", value);
    });
    socket.on("createTask", (value) => {
      console.log("received", value);
      io.emit("createTask", value);
    });
    socket.on("updateTask", (value) => {
      console.log("received", value);
      io.emit("updateTask", value);
    });
    socket.on("newNote", (value) => {
      console.log("received note", value);
      io.emit("newNote", value);
    });
    socket.on("updateNote", (value) => {
      console.log("received note", value);
      io.emit("updateNote", value);
    });
    socket.on("createIssue", (value) => {
      console.log("received Issue", value);
      io.emit("createIssue", value);
    });
    socket.on("updateIssue", (value) => {
      console.log("received Issue", value);
      io.emit("updateIssue", value);
    });

    console.log("Your server is now connected");
  });
  io.on("disconnect", (socket) => {
    console.log("User disconnected");
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
