const express = require('express');
const { attempted, getattemptedbyExam } = require('../controllers/attemptedQuestion');
const router = express.Router();

router.post('/create',attempted)
router.get('/get/:_userId',getattemptedbyExam)



module.exports = router