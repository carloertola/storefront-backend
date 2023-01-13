CREATE TABLE orders (
    CONSTRAINT product_id FOREIGN KEY(id) REFERENCES products(id),
    product_quantity integer,
    CONSTRAINT user_id FOREIGN KEY(id) REFERENCES users(id),
    order_status VARCHAR(32),
    id SERIAL PRIMARY KEY
);