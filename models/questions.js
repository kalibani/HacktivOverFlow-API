const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let questionSchema = new Schema({
  posted_by: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title:{
    type: String
  },
  isi:{
    type: String
  },
  upvote: [{ type: Schema.Types.ObjectId, ref: 'User'}],
  downvote: [{ type: Schema.Types.ObjectId, ref: 'User'}]
})

module.exports = mongoose.model('Question', questionSchema);
