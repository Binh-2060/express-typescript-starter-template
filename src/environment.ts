import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(__dirname, '..', '.env') });

const environment = {
  api_version: process.env.API_VERSION,
  port: process.env.PORT,
  node_env: process.env.NODE_ENV,
};

export default environment;
