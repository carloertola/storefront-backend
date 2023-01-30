import app from '../../server';
import supertest from 'supertest';
import { Product, ProductStore } from '../product';
import jwt from 'jsonwebtoken';

const store = new ProductStore()
const request = supertest(app);
const payload = {
    id: 1,
    firstName: 'test_user'
  }
const token: string = jwt.sign({ payload }, process.env.TOKEN_SECRET as string);

describe("Product models existence", () => {
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
});

describe("Database testing for product methods", () => {
    const product: Product = {
        id: 1,
        name: 'full stack javascript course',
        price: 400.00,
        category: 'udacity courses'
    }

    const updatedProduct: Product = {
        name: 'heuristic full stack development',
        price: 600.00,
        category: 'self-learning courses',
        id: 1
    }

    it("create method should add a product", async () => {
        const result = await store.create({
            name: 'full stack javascript course',
            price: 400.00,
            category: 'udacity courses'
        });
        expect(result).toEqual(product);
    });

    it("index method should return a list of products", async () => {
        const result = await store.index();
        expect(result).toEqual([product]);
    });

    it("show method should return an existing product", async () => {
        const result = await store.show("1");
        expect(result).toEqual(product);
    });

    it("update method should return a modified product", async () => {
        let result = await store.update(updatedProduct);
        expect(result.name).not.toEqual(product.name);
    });

    it("delete method should return the deleted product", async () => {
        const result = await store.delete("1");
        expect(result).toEqual(updatedProduct);
    });
    afterAll(async () => {
        const result = await store.create({
            name: 'full stack javascript course',
            price: 400.00,
            category: 'udacity courses'
        });
    })
})

describe("Tests product endpoints", () => {
    it("should test create route", async () => {
        const product: Product = {
            name: 'test product',
            price: 1000.00,
            category: 'test category'
        }
        request
            .post('/products')
            .set('Authorization', `Bearer ${token}`)
            .send(product)
            .expect('Content-Type', /json/)
            .expect(200)
            .expect({
                name: 'test product',
                price: 1000,
                category: 'test category',
                id: 1
            })
    });

    it('should show all products', () => {
        request
            .get('/products')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect([{
                name: 'test product',
                price: 1000,
                category: 'test category',
                id: 1
            }])
        });

        it('should show a product when passed an id param', () => {
            request
                .get('/products/1')
                .expect('Content-Type', /json/)
                .expect(200)
                .expect({
                    name: 'test product',
                    price: 1000,
                    category: 'test category',
                    id: 1
                })
        });
    
        it('should update product through id param', () => {
            const data = {
                name: 'Edited test',
                price: 950.00,
                category: 'test category'
            }
            request
                .put('/products/1')
                .set('Authorization', `Bearer ${token}`)
                .send(data)
                .expect('Content-Type', /json/)
                .expect(200)
                .expect({
                    name: 'Edited test',
                    price: 950,
                    category: 'test category',
                    id: 1
                })
        });

        it('should delete a product given its id', () => {
            request
                .delete('/products/1')
                .set('Authorization', `Bearer ${token}`)
                .expect(200)
                .then(() => {
                    request.get('/products').expect('No products available. Please check back later')
                });
        });
});