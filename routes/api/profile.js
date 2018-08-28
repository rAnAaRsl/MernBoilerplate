const express = require('express');
const router = express.Router();

// @route  Get api/users/test
// @desc   Test Profile route
// @access Public

router.get('/test', (req, res) => res.json({msg: "profile works"}));

module.exports = router;