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
  async index(userId: string): Promise<Order[]> {
    try {
      // @ts-ignore
      const conn = await sql.connect();
      const sql_query = 'SELECT * FROM orders WHERE user_id=($1)';
      const result = await conn.query(sql_query, [userId]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not retrieve orders. Error: ${err}`);
    }
  }

  async show(id: string, orderId: string): Promise<Order> {
    try {
      // @ts-ignore
      const conn = await sql.connect();
      const sql_query = 'SELECT * FROM orders WHERE id=($1) AND user_id=($2)';
      const result = await conn.query(sql_query, [id, orderId]);
      console.log(result);
      conn.release();
      return result.rows[0];
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
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update order status. Error: ${err}`);
    }
  }

  async addProduct(op: OrderProduct): Promise<OrderProduct> {
    try {
      // @ts-ignore
      const conn = await sql.connect();
      const sql_query = 'INSERT INTO order_products (order_id, product_id, product_quantity)' +
      'VALUES($1, $2, $3) RETURNING *';
      const result = await conn.query(sql_query, [op.order_id, op.product_id, op.product_quantity]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not add product to order. Error: ${err}`);
    }
  }

  async currentOrder(userId: string): Promise<Order[]> {
    try {
      // @ts-ignore
      const conn = await sql.connect();
      const sql_query = 'SELECT * FROM orders WHERE user_id = ($2) AND ' +
      'order_status = ($1) ORDER BY id DESC LIMIT 1';
      const result = await conn.query(sql_query, ['active', userId]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot get current order ${err}`);
    }
  }

  async completedOrders(user_id: string): Promise<Order[]> {
    try {
      // @ts-ignore
      const conn = await sql.connect();
      const sql_query = 'SELECT * FROM orders WHERE user_id=($1) AND order_status=($2)';
      const result = await conn.query(sql_query, [user_id, 'complete']);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get completed orders ${err}`);
    }
  }
}
