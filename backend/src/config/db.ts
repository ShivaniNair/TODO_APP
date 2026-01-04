import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
} = process.env;

if (!DB_HOST || !DB_USER || !DB_NAME) {
  throw new Error(" Database environment variables are missing");
}

const dbConfig: mysql.PoolOptions = {
  host: DB_HOST,
  user: DB_USER,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
};

if (DB_PASSWORD) {
  dbConfig.password = DB_PASSWORD;
}

export const db = mysql.createPool(dbConfig);
