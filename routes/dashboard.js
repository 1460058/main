const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log("welcome dashboard API");
})

module.exports = router