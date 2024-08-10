const express = require('express');
const { createQuestion, getbatchExam, getExamNo, getallQuestion, findQuestionUsingbatchAndexamNo, getAllQuestions } = require('../controllers/question');
const router = express.Router();


router.get('/all', getallQuestion)
// new project starts here
router.post('/create', createQuestion)
router.get('/getall', getAllQuestions)


// end here
router.get('/get/batch/:batchno', getbatchExam)
router.get('/get/examno/:no', getExamNo)
router.get('/get/:examno/:batch', findQuestionUsingbatchAndexamNo)
// router.get('/getall1', getAll)

module.exports = router
module.exports = router
module.exports = router