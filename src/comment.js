const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserModelName = require('./constants/modelNames').UserModelName;
const CommentModelName = require('./constants/modelNames').CommentModelName;

const CommentSchema = new Schema({
    content: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: UserModelName
    }
});

const Comment = mongoose.model(CommentModelName, CommentSchema);

module.exports = Comment;
