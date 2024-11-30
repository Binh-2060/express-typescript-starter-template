import { createServer } from 'http';
import app from './app';
import environment from './environment';
// import loggers from './utils/loggers';
import loggers from './utils/pino';

const port = environment.port || 8002;
const server = createServer(app);

server.listen(port, () => {
  // console.log(`server is listening on port: ${port} - ${environment.node_env}`);
  loggers.info(`Server is listening on port ${port} - ${environment.node_env}`);
});
