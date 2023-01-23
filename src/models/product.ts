// @ts-ignore
import sql from '../database';

export type Product = {
  id?: number | string;
  name: string;
  price: number;
  category: string;
};

export class ProductStore {
  // shows all rows of products without taking any parameters/arguments
  async index(): Promise<Product[]> {
    try {
      // @ts-ignore
      const conn = await sql.connect();
      const sql_query = 'SELECT * FROM products';
      const result = await conn.query(sql_query);
      conn.release();
        return result.rows;
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`);
    }
  }

  // retrieves row specifically requested by client by using id provided
  async show(id: string): Promise<Product> {
    try {
      // @ts-ignore
      const conn = await sql.connect();
      const sql_query = 'SELECT * FROM products WHERE id=($1)';
      const result = await conn.query(sql_query, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`);
    }
  }

  // creates new product with user defined parameters
  async create(p: Product): Promise<Product> {
    try {
      // @ts-ignore
      const conn = await sql.connect();
      const sql_query =
        'INSERT INTO products (name, price, category)' +
        'VALUES($1, $2, $3) RETURNING *';
      const result = await conn.query(sql_query, [p.name, p.price, p.category]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`Could not add new product ${p.name} Error: ${err}`);
    }
  }

  // updates existing product details with newly provided parameters
  async update(p: Product): Promise<Product> {
    try {
      // @ts-ignore
      const conn = await sql.connect();
      const sql_query = 'UPDATE products SET name=($2), price=($3), category=($4) ' +
      'WHERE id=($1) RETURNING *';
      const result = await conn.query(sql_query, [p.id, p.name, p.price, p.category]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`Could not update product with id=${p.id} Error: ${err}`);
    }
  }

  async delete(id: string): Promise<Product> {
    try {
      // @ts-ignore
      const conn = await sql.connect();
      const sql_query = 'DELETE FROM products WHERE id=($1) RETURNING *';
      const result = await conn.query(sql_query, [id]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`Could not delete product ${id}. Error: ${err}`);
    }
  }
}
