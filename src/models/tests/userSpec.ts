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

describe("User Model Methods Existence", () => {
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
            .expect('Content-Type', 'application/json')
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

    it('/users/:id should delete a user', () => {
        request
            .delete('/api/users/1')
            .expect(200)
            .expect({
                "firstname": "Carlo",
                "lastname": "Ertola",
                "password_digest": "$2b$10$6CJxlpob4EVOCb2PzI3INuLzC91f1iJpc54mXknCm.avyP0wmWFtK",
                "id": 1
            })
    });
})