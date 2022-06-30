import knex from "knex";
import configuration from "../knexfile.js";

const env = process.env.NODE_ENV || "development";

const db = knex(configuration[env]);

export default db;
