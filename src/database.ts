import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_USERNAME,
    POSTGRES_PASSWORD,
    POSTGRES_TEST_DB,
    POSTGRES_TEST_USERNAME,
    ENV,
} = process.env;

let sql;

if(ENV === "test") {
    sql = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_TEST_DB,
        user: POSTGRES_TEST_USERNAME,
        password: POSTGRES_PASSWORD,
    });
} else if(ENV === "dev") {
    sql = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        user: POSTGRES_USERNAME,
        password: POSTGRES_PASSWORD,
    });
}

export default sql;