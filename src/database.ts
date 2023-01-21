import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

let sql;

if (process.env.ENV === 'test') {
  sql = new Pool({
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_TEST_DB,
    user: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD
  });
} else if (process.env.ENV === 'dev') {
  sql = new Pool({
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD
  });
}

export default sql;
