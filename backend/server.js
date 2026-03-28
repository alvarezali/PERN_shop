import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import helmet from 'helmet';
import morgan from 'morgan';

const app = express();
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use(cors())
app.use(helmet()); //security middleware that sets up various HTTP headers
app.use(morgan('dev')); // logs the requests

//requests
app.get('/', (req, res) => {
    res.send('Hello from backend!');
});

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});