require("dotenv").config();

exports.SQL = {
    // host: process.env.DB_HOST,
    // port: process.env.DB_PORT,
    // user: process.env.DB_USER,
    // password: process.env.DB_PASS,
    // database: process.env.DB_NAME,

    host: process.env.AWS_DB_HOST,
    port: process.env.AWS_DB_PORT,
    user: process.env.AWS_DB_USER,
    password: process.env.AWS_DB_PASS,
    database: process.env.AWS_DB_NAME,
    connectionLimit: 50,
    waitForConnections: true,
};

exports.KEY = {
    secret_key: "Song_secret",
};