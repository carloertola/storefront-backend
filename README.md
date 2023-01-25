# Storefront Backend
RESTful API and database schema to power  a storefront back-end

## Project Setup Instructions
Clone this repository into your local machine and add a .env file at the root of your folder
### Postgres Database
- Set up a local instance of Postgres or a Docker container (use the links below if you need help)
https://www.prisma.io/dataguide/postgresql/setting-up-a-local-postgresql-database </br>
https://hevodata.com/learn/docker-postgresql </br></br>

- Configure your .env file with all the details needed to connect your API with the Database, as well as some extra variables that we will use for user creation and authentication. Here is what I used on my local machine to build the project, just for reference (your environment might require some details to be different:</br></br>
<code>
  POSTGRES_HOST = localhost </br>
  POSTGRES_DB = shopping </br>
  POSTGRES_TEST_DB = shopping_test </br>
  POSTGRES_USERNAME = shopping_user </br>
  POSTGRES_PASSWORD = password123 </br>
  BCRYPT_PASSWORD = makingdreamshappen </br>
  SALT_ROUNDS = 10 </br>
  TOKEN_SECRET = tokenizer123 </br>
  ENV = dev </br>
</code></br></br>

- On your database CLI run the following commands to create a new user for this project: </br>
Switch to the postgres user <code>su postgres</code></br>
Start psql <code>psql postgres</code></br>
In psql run the following:</br>
<code>CREATE USER shopping_user WITH PASSWORD 'password123';</code></br>
Create the project databases: <code>CREATE DATABASE shopping;</code></br>
Connect to the first database <code>\c shopping</code></br>
<code>GRANT ALL PRIVILEGES ON DATABASE shopping TO shopping_user;</code></br>
To test that it is working run <code>\dt</code> and it should output <code>"No relations found."</code></br>
Do the same thing for the test database</br></br>

- Database port is preferably 5432 and our server will run on port 3000

### NPM Dependencies
In your terminal use <code>npm install</code> to add all the dependencies that we'll use in the project from package.json</br></br>

We'll be using modules like typescript, pg, jsonwebtoken, db-migrate, body-parser, bcrypt, and other packages to test, run, and handle data in our project.

### Commands and Scripts
- Use <code>db-migrate up</code> to create all the tables for the project and <code>db-migrate down</code> to reverse the changes
- Run ts-watch to launch your API using this command</br>
<code>npm run watch</code></br></br>
- To run tests use <code>npm run test</code>

For more details about the project scope, tables, API routes, and data shapes of this project check out the <a href='/REQUIREMENTS.md'>REQUIREMENTS.md</a>