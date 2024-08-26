import * as pg from 'pg';
import environment from '../environment';
import logger from './loggers';
const { Pool } = pg;

const pool = new Pool({
  host: environment.database_host,
  user: environment.database_user,
  password: environment.database_password,
  database: environment.database_schema,
  port: parseInt(environment.database_port),
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export const ConnectDatabase = () => {
  pool.connect();

  pool.on('connect', () => {
    // console.log(`Database connect succesfully`);
    logger.info({
      message: 'Innitial database set up',
      response: 'Database connect succesfully',
    });
  });

  pool.on('error', (err) => {
    console.error(`Database failed:`, err.message);
  });
};

export const getDB = async (): Promise<pg.PoolClient> => {
  const client = await pool.connect();
  return client;
};

export const query = (text, params) => pool.query(text, params);
