import app from '../../server';
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
})