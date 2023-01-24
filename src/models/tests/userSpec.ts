import { User, UserStore } from '../user';

const store = new UserStore()

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