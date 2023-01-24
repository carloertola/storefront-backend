import { Order, OrderProduct, OrderStore } from '../order';

const store = new OrderStore()

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