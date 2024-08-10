const express = require('express');
const { createExam ,getAllexam, AddQuestion,getSingleExam} = require('../controllers/exam');
const router = express.Router();

router.post('/createexam', createExam)
router.get('/getallexam', getAllexam)
router.get('/getsingle/:_id', getSingleExam)
router.put('/addquestion/:examId', AddQuestion)


module.exports = router;