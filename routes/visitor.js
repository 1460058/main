const express = require('express');
const dateFormat = require('dateformat');

const router = express.Router();
const conn = require('../database').init()


router.get('/', (req, res) => {
    const idx = req.query.idx

    if (idx === undefined) {
        const sql = 'SELECT * FROM visitortable';

        conn.query(sql, (err, row) => {
            if (err) {
                console.log(err)
            } else {
                datetimeFormat(row)
                res.json(row)
            }
        })
    } else {
        const idx1 = Number(idx.split(',')[0])
        const idx2 = Number(idx.split(',')[1])

        const sql = 'SELECT * FROM visitortable WHERE id >= ' + idx1 + ' AND id < ' + idx2 + ' + 1';

        conn.query(sql, (err, row) => {
            if (err) {
                console.log(err)
            } else {
                datetimeFormat(row)
                res.json(row)
            }
        })
    }
})

router.get('/dateSearch', (req, res) => {
    const date = req.query.date;

    if (date != undefined && date.length == 10) {
        conn.query('SELECT * FROM visitortable WHERE time LIKE "' + date + '%"', (err, row) => {
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

        sql1 = 'SELECT * FROM visitortable WHERE time BETWEEN date("' + date.split(',')[0] + '") AND date("' + date.split(',')[1] + '")+1'
        sql2 = 'SELECT * FROM visitortable WHERE time BETWEEN date("' + date.split(',')[1] + '") AND date("' + date.split(',')[0] + '")+1'

        const sql = (dateSplit1 < dateSplit2) ? sql1 : sql2

        conn.query(sql, (err, row) => {
            if (err) {
                console.log(err)
            } else {
                datetimeFormat(row)
                res.json(row)
            }
        })
    }
})

router.get('/editRemark/:id', (req, res) => {
    const idx = req.params.id;
    const sql = 'SELECT remark FROM visitortable WHERE id = ' + idx;

    conn.query(sql, (err, row) => {
        if (err) {
            console.log(err)
        } else {
            res.send(row[0].remark)
        }
    })
})

router.patch('/editRemark/:id', (req, res) => {
    const idx = req.params.id;
    const remark_text = req.body.remark_text

    const sql = 'UPDATE visitortable SET remark = "' + remark_text + '" WHERE id=' + idx;
    conn.query(sql, (err, row) => {
        if (err) {
            console.log(err)
        } else {
            res.json({
                success: true,
                code: 200
            })
        }
    })
})

function datetimeFormat(row) {
    for (key in row) {
        row[key].date = dateFormat(row[key].date, "yyyy-mm-dd")
        row[key].time = dateFormat(row[key].time, "HH:MM:ss")
    }
}

module.exports = router