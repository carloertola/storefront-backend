# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- **Index** <code>/products</code> [GET]
- **Show** <code>/products/:id</code> (args: product id) [GET]
- **Create** <code>/products</code> (args: name, price, category) [POST] [Token Required]
- **Update** <code>/products/:id</code> (args: id, name, price, category) [PUT] [Token Required]
- **Destroy** <code>/products/:id</code> (args: id) [DELETE] [Token Required]

#### Users
- **Index** <code>/users</code> [GET] [Token Required]
- **Show** <code>/users/:id</code> (args: product id) [GET] [Token Required]
- **Create** <code>/users</code> (args: firstName, lastName, password) [POST] [Token Required]
- **Destroy** <code>/users/:id</code> (args: id) [DELETE] [Token Required]
- **Authenticate** <code>/users/signin</code> (args: firstName, lastName, password) [POST] [Token Required]

#### Orders
- **Index** <code>/orders</code> [GET] [Token Required]
- **Show** <code>/orders/:id</code> (args: id) [GET] [Token Required]
- **Create** <code>/orders</code> (args: order_status) [POST] [Token Required]
- **Update** <code>/orders/:id</code> (args: id) [PUT] [Token Required]
- **Add Product** <code>/orders/product</code> (args: order_id, product_id, product_quantity) [POST] [Token Required]
- **Current Order** <code>/orders/current</code> [GET] [Token Required]
- **Completed Orders** <code>/orders/complete</code> [GET] [Token Required]

## Data Shapes
#### Product
-  **id** integer
- **name** string
- **price** float
- **category** string

#### User
- **id** integer
- **firstName** string
- **lastName** string
- **password_digest** string

#### Orders
- **id** integer
- **user_id** integer [foreign key]
- **status of order (active or complete)** string

#### Orders Product
- **id** integer
- **product_id** integer [foreign key]
- **product_quantity** integer
- **order_id** integer [foreign key]
