const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let answerSchema = new Schema({
  posted_by: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  questionId: {
    type: Schema.Types.ObjectId,
    ref: 'Question'
  },
  isi:{
    type: String
  },
  upvote: [{ type: Schema.Types.ObjectId, ref: 'User'}],
  downvote: [{ type: Schema.Types.ObjectId, ref: 'User'}]
})

module.exports = mongoose.model('Answer', answerSchema);
