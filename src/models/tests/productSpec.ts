import { Product, ProductStore } from '../product';

const store = new ProductStore()

describe("Product Model", () => {
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

    it("should have a delete method", () => {
        expect(store.delete).toBeDefined();
    });

    it("create method should add a product", async () => {
        const result = await store.create({
            name: 'full stack javascript course',
            price: 400.00,
            category: 'udacity courses'
        });
        expect(result).toEqual({
            id: '1',
            name: 'full stack javascript course',
            price: 400.00,
            category: 'udacity courses'
        });
    });

    it("index method should return a list of products", async () => {
        const result = await store.index();
        expect(result).toEqual([{
            id: '1',
            name: 'full stack javascript course',
            price: 400.00,
            category: 'udacity courses'
        }]);
    });

    it("show method should return an existing product", async () => {
        const result = await store.show('1');
        expect(result).toEqual({
            id: '1',
            name: 'full stack javascript course',
            price: 400.00,
            category: 'udacity courses'
        });
    });

    it("update method should return a modified product", async () => {
        const result = await store.update({
            id: '1',
            name: 'heuristic full stack development',
            price: 600.00,
            category: 'self-learning courses'
        });
        expect(result).toEqual({
            id: '1',
            name: 'heuristic full stack development',
            price: 600.00,
            category: 'self-learning courses'
        });
    });

    it("delete method should return the deleted product", async () => {
        const result = await store.delete('1');
        expect(result).toEqual({
            id: '1',
            name: 'heuristic full stack development',
            price: 600.00,
            category: 'self-learning courses'
        });
    });
});