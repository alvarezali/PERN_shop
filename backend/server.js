import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import helmet from 'helmet';
import morgan from 'morgan';
import productRoutes from './routes/productRoutes.js'

const app = express();
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use(cors())
app.use(helmet()); //security middleware that sets up various HTTP headers
app.use(morgan('dev')); // logs the requests

//requests
app.use('/api/products', productRoutes);


//server
app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});