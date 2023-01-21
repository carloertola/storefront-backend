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
      const sql_query = 'SELECT * FROM users WHERE id=($1)';
      // @ts-ignore
      const conn = await sql.connect();

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
        'INSERT INTO users (firstName, lastName, password_digest) VALUES ($1, $2, $3) RETURNING *';

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

  async authenticate(
    firstName: string,
    lastName: string,
    password: string
  ): Promise<User | null> {
    // @ts-ignore
    const conn = await sql.connect();
    const sql_query =
      'SELECT password_digest FROM users WHERE firstName=($1) AND lastName=($2)';

    const result = await conn.query(sql_query, [firstName, lastName]);

    console.log(password + pepper);

    if (result.rows.length) {
      const user = result.rows[0];

      console.log(user);

      if (bcrypt.compareSync(password + pepper, user.password_digest)) {
        return user;
      }
    }
    return null;
  }

  async delete(id: string): Promise<User> {
    try {
      // @ts-ignore
      const conn = await sql.connect();
      const sql_query = 'DELETE FROM users WHERE id=($1)';

      const result = await conn.query(sql_query, [id]);

      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`Could not delete user ${id}. Error: ${err}`);
    }
  }
}
