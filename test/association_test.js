const mongoose = require('mongoose');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Association', () => {

    let joe, blogPost, comment;

    beforeEach((done) => {
        joe = new user({ name: 'Joe' });
        blogPost = new BlogPost({
            title: 'JS is great',
            content: 'Yes, it is'
        });
        comment = new Comment({
            content: 'First comment'
        });

        joe.blogPost.push(blogPost);
        blogPost.comments.push(comment);
        comment.author = joe;
    });
});
