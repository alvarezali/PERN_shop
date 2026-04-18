import {neon} from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config({path: '../../.env'});

const {NEONDB_URL} = process.env

//creates a SQL connection using env variables
// this sql function is used as a tagged template literal, which allows us to write SQL queries safely
const sql = neon(NEONDB_URL);

//async function getPgVersion() {
//    const result = await sql `SELECT version()`;
//    console.log(result[0]);
//}
//
//getPgVersion();

export default sql

