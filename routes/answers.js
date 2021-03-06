const express = require('express')
const router = express.Router()
const answer = require('../controllers/answersCtrl')
const middleware = require('../middlewares/Authentication')

router.get('/', answer.getAnswer)
router.get('/:id', answer.getAnswerbyId)
router.post('/', middleware.authorization, answer.createAnswer)
router.delete('/:id', middleware.authorization, answer.deleteAnswer)
router.put('/upvote/:id', middleware.authorization, answer.likes)
router.put('/downvote/:id', middleware.authorization, answer.dislike)

module.exports = router;
