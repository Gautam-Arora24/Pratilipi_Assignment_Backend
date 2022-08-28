const express = require('express');
const router = express.Router();

const { signup, like, filterData } = require('../controllers');
const { validate } = require('../middlewares/validate');

router.post('/signup', validate, signup);
router.post('/like/:contentId', like);

router.post('/ingest', filterData);

module.exports = router;
