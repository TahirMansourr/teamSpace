'use server'
const {createServer} = require("node:http")
const next = require('next')
const {Server} = require("socket.io")

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    socket.on('hello' , (value) => {
      console.log( ' iwasclicked' , value);
      io.emit('message' , 'hey')
    })
    socket.on('Groupmessage' , (value) => {
      console.log('recieved' , value);
      io.emit('Groupmessage' , value)
    })
    socket.on('createTask' , (value) => {
      console.log('recieved' , value);
      io.emit('createTask' , value)
    })
  
    console.log('Your server is now connected')
  });
  io.on("disconnect", (socket) => {
    console.log('User disconnected')
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