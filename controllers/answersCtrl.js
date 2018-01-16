const Answer = require('../models/answers');

class AnswerAPI {
  static getAnswer(req, res){
    Answer.find()
    .populate('questionId')
    .populate('posted_by')
    .populate('upvote')
    .populate('downvote')
    .then((dataanswer) => {
      res.status(200).json(dataanswer)
    })
    .catch((err) => {
      res.status(404).send(err)
    })
  }

  static createAnswer(req, res){
    var newanswer = new Answer({
      questionId: req.body.questionId,
      isi: req.body.isi,
      posted_by: req.decoded.userId
    })
    newanswer.save()
    .then((dataanswer) => {
      res.status(200).json({ message: 'Answer Succesfully Added!', dataanswer })
    })
    .catch((err) => {
      res.status(500).send(err)
    })
  }

  static getAnswerbyId(req, res){
    let id = {questionId:req.params.id}
    Answer.findById(questionId)
    .populate('questionId')
    .populate('posted_by')
    .populate('upvote')
    .populate('downvote')
    .then((dataanswer) => {
      res.status(200).json(dataanswer)
    })
    .catch((err) => {
      res.status(404).send(err)
    })
  }

  static deleteAnswer(req, res){
    Answer.findById(req.params.id).then(data => {
      if (data.posted_by == req.decoded.userId) {
        data.remove().then(result => {
          res.status(200).json({ message: "Answer successfully deleted!", result })
        }).catch(err => {
          res.status(500).send(err)
        })
      }else {
        res.status(403).send('Forbidden')
      }
    })
  }

  static likes(req, res) {
    console.log('bom');
    Answer.findOneAndUpdate({_id: req.params.id}, {
      $addToSet : {upvote: req.decoded.userId},
      $pull : {downvote: req.decoded.userId}
    },{new: true})
    .then(data => {
      res.status(200).json({message: 'likes', data})
    })
    .catch(err=>{
      res.status(500).send(err)
    })
  }

  static dislike(req, res) {
    Answer.findOneAndUpdate({_id: req.params.id}, {
      $addToSet : {downvote: req.decoded.userId},
      $pull : {upvote: req.decoded.userId}
    },{new: true})
    .then(data => {
      res.status(200).json({message: 'dislike', data})
    })
    .catch(err=>{
      res.status(500).send(err)
    })
  }

}

module.exports = AnswerAPI
