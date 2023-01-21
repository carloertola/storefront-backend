CREATE TABLE users (
    firstName VARCHAR(150),
    lastName VARCHAR(150),
    password_digest VARCHAR,
    id SERIAL PRIMARY KEY
);