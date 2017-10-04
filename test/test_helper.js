const mongoose = require('mongoose');

// "C:\Program Files\MongoDB\Server\3.4\bin\mongod"

mongoose.connect('mongodb://localhost/users_test');
mongoose.connection
    .once('open', () => console.log('Good to go!'))
    .on('error', (error) => {
        console.warn('Error', error);
});
