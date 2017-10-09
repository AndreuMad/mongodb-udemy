const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

const UserModelName = require('../src/constants/modelNames').UserModelName;
const BlogPostModelName = require('../src/constants/modelNames').BlogPostModelName;
const CommentModelName = require('../src/constants/modelNames').CommentModelName;


describe('Association', () => {

    let joe, blogPost, comment;

    beforeEach((done) => {
        joe = new User({ name: 'Joe' });
        blogPost = new BlogPost({
            title: 'JS is great',
            content: 'Yes, it is'
        });
        comment = new Comment({
            content: 'First comment'
        });

        joe.blogPosts.push(blogPost);
        blogPost.comments.push(comment);
        comment.author = joe;

        Promise.all([
            joe.save(),
            blogPost.save(),
            comment.save()
        ])
            .then(() => done());
    });

    it('Saves a relation between a user and a blogPost', (done) => {
        User.findOne({ name: 'Joe' })
            .populate('blogPosts')
            .then((user) => {
                assert(user.blogPosts[0].title === 'JS is great');
                done();
            });
    });

    it('Saves a full relation tree', (done) => {
        User.findOne({ name: 'Joe' })
            .populate({
                path: 'blogPosts',
                populate: {
                    path: 'comments',
                    model: CommentModelName,
                    populate: {
                        path: 'author',
                        model: UserModelName
                    }
                }
            })
            .then((user) => {
                assert(user.name === 'Joe');
                assert(user.blogPosts[0].title === 'JS is great');
                assert(user.blogPosts[0].comments[0].content === 'First comment');
                assert(user.blogPosts[0].comments[0].author.name === 'Joe');
                done();
            });
    });
});
