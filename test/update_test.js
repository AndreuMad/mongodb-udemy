const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
    let joe;

    beforeEach((done) => {
        joe = new User({
            name: 'Joe'
        });
        joe.save()
            .then(() => done());
    });

    it('Instance type, using set and save', (done) => {
        joe.set('name', 'Alex');
        joe.save()
            .then(() => {
                return User.find({});
            })
            .then((users) => {
                console.log(users);
                assert(users.length === 1);
                assert(users[0].name === 'Alex');
                done();
            });
    });
});