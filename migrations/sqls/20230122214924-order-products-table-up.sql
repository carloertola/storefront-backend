CREATE TABLE order_products (
    order_id integer,
    product_id integer,
    product_quantity integer,
    id SERIAL PRIMARY KEY,
    FOREIGN KEY(order_id) REFERENCES orders(id),
    FOREIGN KEY(product_id) REFERENCES products(id)
);