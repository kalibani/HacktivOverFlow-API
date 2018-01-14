const Question = require('../models/questions');

class QuestionAPI {
  static getQuestion(req, res){
    Question.find()
    .then((dataQuestion) => {
      res.status(200).json(dataQuestion)
    })
    .catch((err) => {
      res.status(404).send(err)
    })
  }

  static createQuestion(req, res){
    var newQuestion = new Question({
      title: req.body.title,
      isi: req.body.isi,
      posted_by: req.decoded.userId
    })
    newQuestion.save()
    .then((dataQuestion) => {
      res.status(200).json({ message: 'Question Succesfully Added!', dataQuestion })
    })
    .catch((err) => {
      res.status(500).send(err)
    })
  }

  static getQuestionbyId(req, res){
    Question.findById(req.params.id).then((dataQuestion) => {
      res.status(200).json(dataQuestion)
    })
    .catch((err) => {
      res.status(404).send(err)
    })
  }

  static updateQuestion(req, res) {
    Question.findById(req.params.id).then(data => {
      if (data.posted_by == req.decoded.userId) {
        data.title = req.body.title
        data.isi = req.body.isi
        data.save().then((updatedQuestion) => {
          res.status(200).json({message: 'Update Success', updatedQuestion})
        }).catch(err => {
          res.status(500).send(err)
        })
      }else {
        res.status(403).send('Forbidden')
      }
    })

  }

  static deleteQuestion(req, res){
    Question.findById(req.params.id).then(data => {
      if (data.posted_by == req.decoded.userId) {
        data.remove().then(result => {
          res.status(200).json({ message: "Question successfully deleted!", result })
        }).catch(err => {
          res.status(500).send(err)
        })
      }else {
        res.status(403).send('Forbidden')
      }
    })
  }

}

module.exports = QuestionAPI
