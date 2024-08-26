import * as db from '../../utils/pg';

export const GetUserService = async () => {
  try {
    const sql = `SELECT * FROM users`;
    const result = await db.query(sql, []);
    return result.rows;
  } catch (error) {
    console.error(error);
    return error;
  }
};

//solution 1
export const CreateUserService = async (username: string) => {
  const client = await db.getDB();
  try {
    //TODO begin transactions
    //https://node-postgres.com/features/transactions
    await client.query('BEGIN');
    const sql = `INSERT INTO users (username) VALUES($1) RETURNING id`;
    const res = await client.query(sql, [username]);
    //TODO commit transactions
    await client.query('COMMIT');
    return res.rows[0];
  } catch (error) {
    console.error(error);
    //TODO rollback
    client.query('ROLLBACK');
    return error;
  } finally {
    client.release();
  }
};
