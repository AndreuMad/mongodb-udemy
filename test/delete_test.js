const assert = require('assert');
const User = require('../src/user');

describe('Removing a user', () => {
    let joe;

    beforeEach((done) => {
        joe = new User({
            name: 'Joe'
        });
        joe.save()
            .then(() => {
                done();
            })
    });

    it('Model instance remove', (done) => {
        joe.remove()
            .then(() => (
                User.findOne({
                    name: 'Joe'
                })
            ))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('Class method remove', (done) => {
        User.remove({
            name: 'Joe'
        })
            .then(() => (
                User.findOne({
                    name: 'Joe'
                })
            ))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('Class method findAndRemove', (done) => {

        User.findOneAndRemove({
            name: 'Joe'
        })
            .then(() => (
                User.findOne({
                    name: 'Joe'
                })
            ))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('Class method findByIdAndRemove', (done) => {

        User.findByIdAndRemove(joe._id)
            .then(() => (
                User.findOne({
                    name: 'Joe'
                })
            ))
            .then((user) => {
                assert(user === null);
                done();
            });
    });
});
