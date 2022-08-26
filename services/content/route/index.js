const express = require('express');
const router = express.Router();
const { getBooksAsContent, getTopContent, updateLike, ingestCSV } = require('../controllers');


router.get('/', getBooksAsContent);
router.get('/topcontent', getTopContent);
router.post('/like/:contentId', updateLike);

/* API to help ingest the CSV into the database*/
router.post('/ingest', ingestCSV);

module.exports = router;
