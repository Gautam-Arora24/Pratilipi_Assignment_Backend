const express = require('express');
const router = express.Router();
const { signup, like } = require('../controllers');
const { validate } = require('../middlewares/validate');


router.post('/signup', validate, signup);
router.post('/like/:contentId', like);

module.exports = router;
