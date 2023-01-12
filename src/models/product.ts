// @ts-ignore
import sql from '../database';

export type Product = {
    name: string;
    price: number;
    category: string;
    id: number;
}

export class ProductStore {
    async index(): Promise<Product[]> {
        try {
            // @ts-ignore
            const conn = await sql.connect();
            const sql_query = 'SELECT * FROM product';

            const result = await conn.query(sql_query);

            conn.release();

            return result.rows;
        } catch(err) {
            throw new Error(`Could not get products. Error: ${err}`);
        }
    }

    async show(id: string): Promise<Product> {
        try {
            const sql_query = 'SELECT * FROM product WHERE id=($1)';
            // @ts-ignore
            const conn = await sql.connect();

            const result = await conn.query(sql_query, [id]);

            conn.release();

            return result.rows[0];
        } catch(err) {
            throw new Error(`Could not find product ${id}. Error: ${err}`)
        }
    }

    async create(p: Product): Promise<Product> {
        try {
            const sql_query = 'INSERT INTO product (name, price, category) VALUES($1, $2, $3) RETURNING *';
            // @ts-ignore
            const conn = await sql.connect();

            const result = await conn.query(sql_query, [p.name, p.price, p.category]);

            const product = result.rows[0];
            
            conn.release();

            return product;
        } catch(err) {
            throw new Error(`Could not add new product ${name} Error: ${err}`);
        }
    }

    async delete(id: string): Promise<Product> {
        try {
            const sql_query = 'DELETE FROM product WHERE id=($1)';
            // @ts-ignore
            const conn = await sql.connect();

            const result = await conn.query(sql_query, [id]);

            const product = result.rows[0];

            conn.release();

            return product;
        } catch(err) {
            throw new Error(`Could not delete product ${id}. Error: ${err}`)
        }
    }
}