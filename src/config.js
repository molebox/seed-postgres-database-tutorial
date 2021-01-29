const dotenv = require('dotenv');
dotenv.config();
// Single source to handle all the env vars
module.exports = {
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
};