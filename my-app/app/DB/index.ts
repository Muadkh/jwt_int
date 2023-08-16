import {drizzle} from 'drizzle-orm/node-postgres'
import pg, { Client } from 'pg';
import * as schema from '../DB/schema'
const { Pool } = pg;

const client = new Client({
  connectionString: process.env.POSTGRES_URL +"?sslmode=require",
  
})

client.connect()
export const db =drizzle(client,{schema:schema})

