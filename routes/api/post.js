const express = require("express");
const router = express.Router();

// @route  Get api/users/test
// @desc   Test post route
// @access Public


router.get('/test', (req, res) => res.json({msg: "posts works"}));


module.exports = router;