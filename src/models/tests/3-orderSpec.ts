/* import app from '../../server';
import supertest from 'supertest';
import { Order, OrderProduct, OrderStore } from '../order';
import jwt from 'jsonwebtoken';

const store = new OrderStore()
const request = supertest(app);
const payload = {
    id: 1,
    firstName: 'test_user'
  }
const token: string = jwt.sign({ payload }, process.env.TOKEN_SECRET as string);


describe("Order Model Methods Existence", () => {
    it("should have an index method", () => {
        expect(store.index).toBeDefined();
    });

    it("should have a show method", () => {
        expect(store.show).toBeDefined();
    });

    it("should have a create method", () => {
        expect(store.create).toBeDefined();
    });

    it("should have a update method", () => {
        expect(store.update).toBeDefined();
    });

    it("should have an addProduct method", () => {
        expect(store.addProduct).toBeDefined();
    });

    it("should have a currentOrder method", () => {
        expect(store.currentOrder).toBeDefined();
    });

    it("should have a completedOrders method", () => {
        expect(store.completedOrders).toBeDefined();
    });
});

describe('Tests database queries', () => {
    const order: Order = {
        id: 1,
        user_id: 1,
        order_status: "active"
    }

    const orderComplete: Order = {
        id: 1,
        user_id: 1,
        order_status: "complete"
    }

    const orderProduct: OrderProduct = {
        "order_id": 1,
        "product_id": 1,
        "product_quantity": 1000
      }

    it("create method should create a new order", async () => {
        const result = await store.create(order);
        console.log(result);
        expect(result).toEqual(order);
    });

    it("index method should list all orders", async () => {
        const result = await store.index("1");
        console.log(result);
        expect(result[0]).toEqual(order);
    });

    it("show method should return specified order", async () => {
        const result = await store.show("1", "1");
        console.log(result);
        expect(result).toEqual(order);
    });

    it("currentOrder should retrieve the last order placed by the user", async () => {
        const result = await store.currentOrder("1");
        console.log(result);
        expect(result[0]).toEqual(order);
    });

    it("update method should update specified order", async () => {
        const result = await store.update(orderComplete);
        console.log(result);
        expect(result).toEqual(orderComplete);
    });

    it("addProduct method should add a product to order", async () => {
        const result = await store.addProduct(orderProduct);
        console.log(result);
        expect(result).toEqual(orderProduct);
    });

    it("completedOrders should show all completed orders", async () => {
        const result = await store.completedOrders("1");
        console.log(result);
        expect(result[0]).toEqual(orderComplete);
    });
});

describe('Tests order endpoints', () => {
    it('should create a new order', () => {
        const order: Order = {
            user_id: 1,
            order_status: 'active'
        }
        request
            .post('/orders/')
            .set('Authorization', `Bearer ${token}`)
            .send(order)
            .expect('Content-Type', 'application/json')
            .expect(200)
            .expect({
                "user_id": 1,
                "order_status": "active",
                "id": 1
            })
    })

    it('should add product to the first order', () => {
        const orderProduct: OrderProduct = {
            order_id: 1,
            product_id: 1,
            product_quantity: 10
        }
        request
            .post('/orders/product')
            .set('Authorization', `Bearer ${token}`)
            .send(orderProduct)
            .expect('Content-Type', 'application/json')
            .expect(200)
            .expect({
                "order_id": 1,
                "product_id": 1,
                "product_quantity": 10,
                "id": 1
            })
    });

    it('should show all orders', () => {
        request
            .get('/orders')
            .expect('Content-Type', 'application/json')
            .expect(200)
            .expect([
                {
                    "user_id": 1,
                    "order_status": "active",
                    "id": 1
                }
            ])
    })

    it('should show a specified order', () => {
        request
            .get('/orders/1')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', 'application/json')
            .expect(200)
            .expect({
                "user_id": 1,
                "order_status": "active",
                "id": 1
            })
    })

    it('should update an order', () => {
        const order: Order = {
            user_id: 1,
            order_status: 'complete'
        }
        request
            .put('/orders/1')
            .set('Authorization', `Bearer ${token}`)
            .send(order)
            .expect('Content-Type', 'application/json')
            .expect(200)
            .expect({
                "user_id": 2,
                "order_status": "complete",
                "id": 2
            })
    })

    it('should show orders with status active', () => {
        request
            .get('/ordersCurrent')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .expect('No active orders')
    });

    it('should show orders with status complete', () => {
        request
            .get('/ordersComplete')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .expect([
                {
                    "user_id": 1,
                    "order_status": "complete",
                    "id": 1
                }
            ])
    });
}) */