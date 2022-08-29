const express = require('express');
const router = express.Router();
const {  getTopContent, updateLike, ingestCSV } = require('../controllers');


router.get('/topcontent', getTopContent);
router.post('/like/:contentId', updateLike);

/* API to help ingest the CSV into the database*/
router.post('/ingest', ingestCSV);

module.exports = router;
