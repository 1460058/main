const express = require('express');
const dateFormat = require('dateformat');

const router = express.Router();
const conn = require('../database').init()


router.get('/', (req, res) => {
    const sql = 'SELECT * FROM visitortable';

    conn.query(sql, (err, row) => {
        if (err) {
            console.log(err)
        } else {
            datetimeFormat(row)
            res.json(row)
        }
    })
})

router.get('/dateSearch', function(req, res) {
    const date = req.query.date;

    if (date != undefined && date.length == 10) {
        conn.query('SELECT * FROM visitortable WHERE time LIKE "' + date + '%"', function(err, row) {
            if (err) {
                console.log(err)
            } else {
                datetimeFormat(row)
                res.json(row)
            }
        })
    } else {
        const dateSplit1 = Number(date.split(',')[0].substr(8, 2))
        const dateSplit2 = Number(date.split(',')[1].substr(8, 2))

        if (dateSplit1 < dateSplit2) {
            conn.query('SELECT * FROM visitortable WHERE time BETWEEN date("' + date.split(',')[0] + '") AND date("' + date.split(',')[1] + '")+1', function(err, row) {
                if (err) {
                    console.log(err)
                } else {
                    datetimeFormat(row)
                    res.json(row)
                }
            })
        } else {
            conn.query('SELECT * FROM visitortable WHERE time BETWEEN date("' + date.split(',')[1] + '") AND date("' + date.split(',')[0] + '")+1', function(err, row) {
                if (err) {
                    console.log(err)
                } else {
                    datetimeFormat(row)
                    res.json(row)
                }
            })
        }
    }
})

function datetimeFormat(row) {
    for (key in row) {
        row[key].date = dateFormat(row[key].date, "yyyy-mm-dd")
        row[key].time = dateFormat(row[key].time, "HH:MM:ss")
    }
}

module.exports = router