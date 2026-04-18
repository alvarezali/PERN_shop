import arcjet, {detectBot, shield, tokenBucket} from "@arcjet/node";
import dotenv from 'dotenv'

dotenv.config({path: '../../.env'});

const aj = arcjet({
    key: process.env.ARCJET_KEY,
    characteristics: ['userId'],
    rules: [
        //shield protects the app from common attacks e.g. SQL injections, XSS, CSRF attacks
        shield({mode: 'LIVE'}),
        detectBot({
            mode: 'LIVE',
            //blocks all bots except search engine
            allow: ['CATEGORY:SEARCH_ENGINE'],
            //full list at https://arcjet.com/bot-list
        }),
        //rate limiting
        tokenBucket({
            mode:'LIVE',
            refillRate:5,
            interval:10,
            capacity:10,
        }),
    ],
});

export default aj;