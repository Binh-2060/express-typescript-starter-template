import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(__dirname, '..', '.env') });

const environment = {
  api_version: process.env.API_VERSION,
  port: process.env.PORT,
  node_env: process.env.NODE_ENV,
  database_host: process.env.DATABASE_HOST,
  database_user: process.env.DATABASE_USER,
  database_password: process.env.DATABASE_PASSWORD,
  database_schema: process.env.DATABSE_SCHEMA,
  database_port: process.env.DATABASE_PORT,
};

export default environment;
