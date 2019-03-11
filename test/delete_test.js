
const assert = require('assert');
const User = require('../src/user');

describe('deleting a user', () => {

    let joe;

    beforeEach((done) => {
        joe = new User({ name: 'Joe' });
        joe.save()
           .then(() => done())
           .catch(e => console.error(e));
    });

    it('model instance remove', (done) => {
        console.log('in deleting');
        joe.remove()
            .then(() => User.findOne({ name: 'Joe'}))
            .then((user) => {
                assert(user === null);
                done();
            })
            .catch(e => console.error(e));
       
    });

    it('class method remove', (done) => {
        User.deleteMany({name: 'Joe'})
            .then(() => User.findOne({ name: 'Joe'}))
            .then((user) => {
                assert(user === null);
                done();
            })
            .catch(e => console.error(e));
       
    });
    
    it('class method findOneAndRemove', (done) => {
        User.findOneAndRemove({name: 'Joe'})
            .then(() => User.findOne({ name: 'Joe'}))
            .then((user) => {
                assert(user === null);
                done();
            })
            .catch(e => console.error(e));
       
    });

    it('class method findByIdAndRemove', (done) => {
        User.findByIdAndRemove(joe._id)
            .then(() => User.findOne({ name: 'Joe'}))
            .then((user) => {
                assert(user === null);
                done();
            })
            .catch(e => console.error(e));
       
    });

});
