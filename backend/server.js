import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import helmet from 'helmet';
import morgan from 'morgan';
import sql from './config/db.js'
import aj from './lib/arcjet.js'
import productRoutes from './routes/productRoutes.js'


const app = express();
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use(cors())
app.use(helmet()); //security middleware that sets up various HTTP headers
app.use(morgan('dev')); // logs the requests

app.use(async (req, res, next) => {
    try {
        const decision = await aj.protect(req, {
            requested: 1 //specifies that each request consumes 1 token
        });

        if(decision.isDenied()) {
            if(decision.reason.isRateLimit()) {
                res.status(429).json({error: 'Too many requests'});
            } else if(decision.reason.isBot()) {
                res.status(403).json({error: 'Bot access denied'});
            } else {
                res.status(403).json({error: 'Forbidden'});
            }
            return;
        }

        //check for spoofed bots
        if(decision.results.some((result) => result.reason.isBot() && result.reason.isSpoofed())) {
            res.status(403).json({error: 'Spoofed bot detected'});
            return;
        }

        next();

    } catch(error) {
        console.log('Arcjet error ', error);
        next(error);
    }
});

//Product route
app.use('/api/products', productRoutes);

//function to create a new database if it doesn't exists
async function initializeDB() {
    try {
   
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

        console.log('DB initialized sucessfully');

    } catch(error) {
        console.error('Error initializing DB ', error);
    }
}

//initialize DB and server
initializeDB().then(() => {
    app.listen(PORT, () => {
        console.log('Server is running on port ' + PORT);
    });
});   

    

