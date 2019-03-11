const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of database ', () => {

    let joe;

    beforeEach((done) => {
        joe = new User({ name: 'Joe' });
        joe.save()
           .then(() => done())
           .catch(e => console.error(e));
    });

    it('finds all users with a name joe', (done) => {
        User.find({ name: 'Joe' })
            .then((users) => {
                console.log('in reading');
                assert(users[0]._id.toString() === joe._id.toString());
                done();
            })
            .catch(e => console.error(e));
    });

});