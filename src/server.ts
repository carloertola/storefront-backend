import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import product_routes from './handlers/products';
import user_routes from './handlers/users';
import order_routes from './handlers/orders';

const app: express.Application = express();
const address: string = '0.0.0.0:3000';

// This code can be used to enable CORS for the API
/* const corsOptions = {
    origin: 'someotherdomain.com',
    optionsSuccessStatus: 200
} */

app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!');
});

product_routes(app);
user_routes(app);
order_routes(app);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
