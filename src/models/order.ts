// @ts-ignore
import sql from '../database';

export type Order = {
  id?: number;
  product_id: number;
  product_quantity: number;
  user_id: number;
  order_status: string;
};

export class OrderStore {
  async currentOrder(user_id: string): Promise<Order> {
    try {
      // @ts-ignore
      const conn = await sql.connect();
      const sql_query = '';
      const result = await conn.query(sql_query);
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
