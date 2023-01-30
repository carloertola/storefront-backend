import app from '../../server';
import supertest from 'supertest';
import { User, UserStore } from '../user';
import jwt from 'jsonwebtoken';

const store = new UserStore()
const request = supertest(app);
const payload = {
    id: 1,
    firstName: 'test_user'
  }
const token: string = jwt.sign({ payload }, process.env.TOKEN_SECRET as string);

describe("User Model Methods Existence and Database Queries", () => {
    const user: User = {
        firstName: 'Carlo',
        lastName: 'Ertola',
        password: 'One@Love'
    }
    it("should have an index method", () => {
        expect(store.index).toBeDefined();
    });

    it("should have a show method", () => {
        expect(store.show).toBeDefined();
    });

    it("should have a create method", () => {
        expect(store.create).toBeDefined();
    });

    it("should have an authenticate method", () => {
        expect(store.authenticate).toBeDefined();
    });

    it("should have a delete method", () => {
        expect(store.delete).toBeDefined();
    });

    it("create method should create a user", async () => {
        const result = await store.create(user);
        expect(result.id).toBe(1);
    });

    it("index method should return an array of all users if token exists", async () => {
        const result = await store.index();
        expect(result[0].firstName).not.toBe('Udacity');
    });

    it("show method selects specified user", async () => {
        const result = await store.show('1');
        expect(result.id).toEqual(1);
    });

    it("delete method removes a specified user", async () => {
        const result = await store.delete('1');
        expect(result.id).toEqual(1);
    });

    it("authenticate method returns the correct response", async () => {
        const result = await store.authenticate({
            id: '1',
            firstName: 'Unknown',
            lastName: 'Mystery',
            password: 'One@Love'
        });
        expect(result).toEqual(null);
    });
});

describe('Tests user endpoints', () => {
    it('it should create a new user', () => {
        const user: User = {
            firstName: 'Carlo',
            lastName: 'Ertola',
            password: 'One@Love'
        }
        request
            .post('/users')
            .send(user)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
            .then(() => {
                request.get('/users').expect([
                    {
                        "firstname": "Carlo",
                        "lastname": "Ertola",
                        "password_digest": "$2b$10$6CJxlpob4EVOCb2PzI3INuLzC91f1iJpc54mXknCm.avyP0wmWFtK",
                        "id": 1
                    }
                ])
            });
    });

    it('tests if show retrieves specified user', () => {
        request
            .get('/users/1')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', 'application/json')
            .expect(200)
            .expect({
                "firstname": "Carlo",
                "lastname": "Ertola",
                "password_digest": "$2b$10$6CJxlpob4EVOCb2PzI3INuLzC91f1iJpc54mXknCm.avyP0wmWFtK",
                "id": 1
            })
    })

    it('should delete a user', () => {
        request
            .delete('/users/1')
            .expect(200)
            .expect({
                "firstname": "Carlo",
                "lastname": "Ertola",
                "password_digest": "$2b$10$6CJxlpob4EVOCb2PzI3INuLzC91f1iJpc54mXknCm.avyP0wmWFtK",
                "id": 1
            })
    });
})