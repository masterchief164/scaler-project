import {DB} from "../DAL/DB";
import {DBImpl} from "../DAL/pg/DBImpl";

const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
    console.log('Database connected successfully!');
});


export const db: DB = new DBImpl(pool);