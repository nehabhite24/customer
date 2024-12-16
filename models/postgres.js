const { Pool } = require('pg');
require("dotenv").config();

const pool = new Pool({
    user: process.env.PostgresUser,
    host: process.env.PostgresHost,
    //host: process.env.PostgresLocalhost,
    database: process.env.PostgresDatabase,
    password: process.env.PostgresPassword,
    port: process.env.PostgresPort,
    //port: process.env.PostgresLocalPort,
    ssl: {
        require: true,
        rejectUnauthorized: false
    }
});
pool.on('error', (err, client) => {
    console.error('Connection Error:', err);
});

module.exports = pool;