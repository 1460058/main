const mysql = require('mysql')
const dbConfig = require('./config')

module.exports = {
    init: () => {
        return mysql.createConnection(dbConfig.SQL);
    },
    connect: () => {
        conn.connect((err) => {
            if (err) console.error('mysql connection error : ' + err);
            else console.log("rmysql is connected successfully")
        })
    }
}