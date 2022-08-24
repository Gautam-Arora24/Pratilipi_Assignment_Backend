const express = require('express');
const router = express.Router();
const { getBooksAsContent, getTopContent, updateLike } = require('../controllers');


router.get('/', getBooksAsContent);
router.get('/topcontent', getTopContent);
router.post('/like/:contentId', updateLike);

module.exports = router;
