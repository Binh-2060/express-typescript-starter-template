import { createServer } from 'http';
import app from './app';
import environment from './environment';
import loggers from './utils/loggers';
import { Server } from 'socket.io';
const port = environment.port || 8002;
const server = createServer(app);
const io = new Server(server, {
  cors: {
    allowedHeaders: [
      'Access-Control-Allow-Methods',
      'Access-Control-Allow-Headers',
      'Access-Control-Allow-Credentials',
    ],
  },
});

io.on('connection', (socket) => {
  console.log(`Socket connected`);
  socket.on('disconnect', () => {
    console.log(`socker disconnected`);
  });

  socket.on('send_message', (value) => {
    console.log(`value of send message`, value);
  });
});

server.listen(port, () => {
  // console.log(`server is listening on port: ${port} - ${environment.node_env}`);
  loggers.info(`Server is listening on port ${port} - ${environment.node_env}`);
});
