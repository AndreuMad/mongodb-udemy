const mongoose = require('mongoose');

// "C:\Program Files\MongoDB\Server\3.4\bin\mongod"

mongoose.Promise = global.Promise;

before((done) => {

    mongoose.connect('mongodb://localhost/users_test');
    mongoose.connection
        .once('open', () => done())
        .on('error', (error) => {
            console.warn('Error', error);
        });
});

beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
        done();
    });
});
