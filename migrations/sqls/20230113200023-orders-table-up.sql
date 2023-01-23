CREATE TABLE orders (
    user_id integer,
    order_status VARCHAR(32),
    id SERIAL PRIMARY KEY,
    FOREIGN KEY(user_id) REFERENCES users(id)
);