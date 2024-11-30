import { createServer } from 'http';
import app from './app';
import environment from './environment';
import loggers from './utils/loggers';

const port = environment.port || 8002;
const server = createServer(app);

server.listen(port, () => {
  // console.log(`server is listening on port: ${port} - ${environment.node_env}`);
  loggers.info(`Server is listening on port ${port} - ${environment.node_env}`);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received.');
  console.log('Graceful shutdown');
  server.close(() => {
    console.log('Begining Close');
    process.exit(0);
  });
});
