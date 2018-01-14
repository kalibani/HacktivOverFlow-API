const express = require('express')
const router = express.Router()
const question = require('../controllers/questionsCtrl')
const middleware = require('../middlewares/Authentication')

router.get('/', question.getQuestion)
router.get('/:id', question.getQuestionbyId)
router.post('/', middleware.authorization, question.createQuestion)
router.put('/update/:id', middleware.authorization, question.updateQuestion)
router.delete('/:id', middleware.authorization, question.deleteQuestion)

module.exports = router;
