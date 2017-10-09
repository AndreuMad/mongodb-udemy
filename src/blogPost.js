const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPostModelName = require('./constants/modelNames').BlogPostModelName;
const CommentModelName = require('./constants/modelNames').CommentModelName;

const BlogPostSchema = new Schema({
    title: String,
    content: String,
    comments: [{
        type: Schema.Types.ObjectId,
        ref: CommentModelName
    }]
});

const BlogPost = mongoose.model(BlogPostModelName, BlogPostSchema);

module.exports = BlogPost;
