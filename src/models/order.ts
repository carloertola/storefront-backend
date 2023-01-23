// @ts-ignore
import sql from '../database';

export type Order = {
  id?: number | string;
  user_id: number | string;
  order_status: string;
}

export type OrderProduct = {
  id?: number | string;
  order_id: number | string;
  product_id: number | string;
  product_quantity: number;
}

export class OrderStore {
  async index(id: string): Promise<Order[]> {
    try {
      // @ts-ignore
      const conn = await sql.connect();
      const sql_query = 'SELECT * FROM orders WHERE user_id=($1)';
      const result = await conn.query(sql_query, [id]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not retrieve orders. Error: ${err}`);
    }
  }

  async show(id: string, userId: string): Promise<Order> {
    try {
      // @ts-ignore
      const conn = await sql.connect();
      const sql_query = 'SELECT * FROM orders WHERE id=($1) AND user_id=($2)';
      const result = await conn.query(sql_query, [id, userId]);
      conn.release();
      return result.row[0];
    } catch (err) {
      throw new Error(`Failed to retrieve order. Error: ${err}`);
    }
  }

  async create(o: Order): Promise<Order> {
    try {
      // @ts-ignore
      const conn = await sql.connect();
      const sql_query = 'INSERT INTO orders (order_status, user_id) ' +
      'VALUES($1, $2) RETURNING *';
      const result = await conn.query(sql_query, [o.order_status, o.user_id]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`Could not create new order. ${err}`);
    }
  }

  async update(o: Order): Promise<Order> {
    try {
      // @ts-ignore
      const conn = await sql.connect();
      const sql_query = 'UPDATE orders SET order_status=($1) WHERE id=($2) AND user_id=($3) RETURNING *';
      const result = await conn.query(sql_query, [o.order_status, o.id, o.user_id]);
      return result;
    } catch (err) {
      throw new Error(`Could not update order status. Error: ${err}`);
    }
  }

  async addProduct(op: OrderProduct): Promise<OrderProduct> {
    try {
      // @ts-ignore
      const conn = await sql.connect();
      const sql_query = 'INSERT INTO order_products (order_id, product_id, product_quantity' +
      'VALUES($1, $2, $3) RETURNING *';
      const result = conn.query(sql_query, [op.order_id, op.product_id, op.product_quantity]);
      conn.release();
      return result[0];
    } catch (err) {
      throw new Error(`Could not add product to order. Error: ${err}`);
    }
  }

  async currentOrder(user_id: string): Promise<Order[]> {
    try {
      // @ts-ignore
      const conn = await sql.connect();
      const sql_query = 'SELECT * FROM orders WHERE order_status=($1) RETURNING *';
      const result = await conn.query(sql_query, "active");
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get current order ${err}`);
    }
  }

  async completedOrders(user_id: string): Promise<Order[]> {
    // @ts-ignore
    const conn = await sql.connect();
    const sql_query =
      'SELECT * FROM orders WHERE user_id=($1) && order_status="complete"';
    const result = await conn.query(sql_query, [user_id]);
    conn.release();
    return result.rows[0];
  }
}
