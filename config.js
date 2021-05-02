require('dotenv').config();

exports.SQL = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
}

exports.KEY = {
    'secret_key': 'Song_secret'
}