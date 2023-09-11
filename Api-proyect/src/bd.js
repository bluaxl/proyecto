import {createPool} from "mysql2/promise";
import {DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE, DB_PORT} from './config.js'

//Crea la conexion con la base de datos
export const pool = createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT,
    database: DB_DATABASE
})