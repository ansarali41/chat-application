// external import
const express = require('express');
const router = express.Router();

// internal import
const { getInbox } = require('../controller/inboxController');
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse');

// Inbox page
router.get('/', decorateHtmlResponse('Inbox'), getInbox);

module.exports = router;
