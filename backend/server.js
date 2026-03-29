import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import helmet from 'helmet';
import morgan from 'morgan';
import sql from './config/db.js'
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

async function initializeDB() {
    try {
        const result = await sql `SELECT version()`
        console.log(result[0]);
        
        await sql `
            CREATE TABLE IF NOT EXISTS products (
              id SERIAL PRIMARY KEY,
              name VARCHAR(255) NOT NULL,
              image VARCHAR(225) NOT NULL,
              price DECIMAL (10,2) NOT NULL,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
         `;

        console.log('NeonDB initialized sucessfully');

    } catch(error) {
        console.error('Error initializing DB ', error);
    }
}

//initialize DB
initializeDB().then(() => {
    //initialize server
    app.listen(PORT, () => {
        console.log('Server is running on port ' + PORT);
    });
});   

    

