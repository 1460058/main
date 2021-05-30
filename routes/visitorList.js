const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log("welcome visitorList API");
})

module.exports = router