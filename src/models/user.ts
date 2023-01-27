// @ts-ignore
import sql from '../database';
import bcrypt from 'bcrypt';

const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = String(process.env.SALT_ROUNDS);

export type User = {
  id?: number | string;
  firstName: string;
  lastName: string;
  password: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      // @ts-ignore
      const conn = await sql.connect();
      const sql_query = 'SELECT * FROM users';

      const result = await conn.query(sql_query);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      // @ts-ignore
      const conn = await sql.connect();
      const sql_query = 'SELECT * FROM users WHERE id=($1)';

      const result = await conn.query(sql_query, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

  async create(u: User): Promise<User> {
    try {
      // @ts-ignore
      const conn = await sql.connect();
      const sql_query =
        'INSERT INTO users (firstName, lastName, password_digest) ' +
        'VALUES ($1, $2, $3) RETURNING *';
      const hash = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds));
      const result = await conn.query(sql_query, [
        u.firstName,
        u.lastName,
        hash
      ]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(
        `Could not add new user ${u.firstName} ${u.lastName} Error: ${err}`
      );
    }
  }

  async authenticate(u: User): Promise<User | null> {
    try {
       // @ts-ignore
      const conn = await sql.connect();
      const sql_query =
        'SELECT firstName, lastName, password_digest FROM users ' +
        'WHERE id=($1) AND firstName=($2) AND lastName=($3)';
      const result = await conn.query(sql_query, [u.id, u.firstName, u.lastName]);
      if (result.rows[0]) {
        const u_password_digest = result.rows[0].password_digest;
        if (bcrypt.compareSync(u.password + pepper, u_password_digest)) {
          u.password = u_password_digest;
          return u;
        } else {
          return null;
        }
      } else {
        return null;
      }
    } catch {
      throw new Error('Sign in failed!');
    }
   
  }

  async delete(id: string): Promise<User> {
    try {
      // @ts-ignore
      const conn = await sql.connect();
      const sql_query = 'DELETE FROM users WHERE id=($1) RETURNING *';
      const result = await conn.query(sql_query, [id]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`Could not delete user ${id}. Error: ${err}`);
    }
  }
}
