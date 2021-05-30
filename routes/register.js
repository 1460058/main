const express = require("express");
const router = express.Router();
const cryptoJS = require("crypto-js");
const secret = require("../config").KEY;

const conn = require("../database").init();

// 회원가입 검사
router.post("/", (req, res) => {
    const registerInfo = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    };
    const sql = 'SELECT * FROM admin_users WHERE email = "' + registerInfo.email + '"';
    conn.query(sql, (err, row) => {
        if (row[0] == undefined) { // 동일한 아이디가 없는 경우
            var pw_encrypted = cryptoJS.AES.encrypt(registerInfo.password, secret.secret_key).toString(); // 암호화
            conn.query('INSERT INTO admin_users (name,email,password) VALUES ("' + registerInfo.name + '","' + registerInfo.email + '","' + pw_encrypted + '")', (err) => {
                if (err) console.log(err)
                else {
                    res.json({
                        status: 200,
                        message: "회원가입에 성공하였습니다.",
                    })
                }
            })
        } else {
            res.json({
                status: 400,
                message: "동일한 이메일이 사용되고 있습니다.",
            });
        }
    })
});

module.exports = router;