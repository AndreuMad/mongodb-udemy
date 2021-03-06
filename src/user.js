const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserModelName = require('./constants/modelNames').UserModelName;
const BlogPostModelName = require('./constants/modelNames').BlogPostModelName;

const PostSchema = require('./post');

const UserSchema = new Schema({
    name: {
        type: String,
        validate: {
            validator: (name) => name.length > 2,
            message: 'Name must be longer than 2 characters'
        },
        required: [true, 'Name is required']
    },
    posts: [PostSchema],
    likes: Number,
    blogPosts: [{
        type: Schema.Types.ObjectId,
        ref: BlogPostModelName
    }]
});

UserSchema.virtual('postCount').get(function() {
    return this.posts.length;
});

UserSchema.pre('remove', function(next) {
    const BlogPost = mongoose.model(BlogPostModelName);

    BlogPost.remove({ _id: { $in: this.blogPosts } })
        .then(() => next());
});

const User = mongoose.model(UserModelName, UserSchema);

module.exports = User;
