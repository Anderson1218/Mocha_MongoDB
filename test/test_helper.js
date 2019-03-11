const mongoose = require('mongoose');

//global.Promise is ES6 implementation of promises inside Nodejs
mongoose.Promise = global.Promise;


//root level hooks(before)
before((done) => {
    console.log('Start connecting to Mongo');
    mongoose.connect('mongodb://localhost/user_test', { useNewUrlParser: true });
    mongoose.connection
        .once('open', () => {done();})
        .on('error', (error) => {
            console.warn('warning', error);
        });
});


//root level hooks(beforeEach)
//before each test
beforeEach((done) => {
    //callbalck in drop() will only be called once after the drop operation is done
    mongoose.connection.collections.users.drop(() => {
        //ready to run the next test
        done();
    });
});   