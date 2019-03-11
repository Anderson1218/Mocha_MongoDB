const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');

mongoose.set('useFindAndModify', false);

describe('Updating Records', () => {

    let joe;

    beforeEach((done) => {
        joe = new User({ name: 'Joe' });
        joe.save()
           .then(() => done())
           .catch(e => console.error(e));
    });
    function assertName(operation, done){
        operation
        .then(() => User.find({}))
        .then((users) => {
            assert(users.length === 1);
            assert(users[0].name === 'Alex');
            done();
        })
        .catch(e => console.error(e));

    }

    it('instance type using set and save', (done) => {
       console.log('in updating');
       joe.set('name', 'Alex');
       assertName(joe.save(), done);
    });

    it('A model instance can update', (done) => {
        assertName(joe.updateOne({name: 'Alex'}), done);
    });

    it('A model class can update', (done) =>{
       assertName(
         User.updateOne({ name: 'Joe'}, { name: 'Alex'}),
         done
       ); 
    });
    it('A model class can update one record', (done) =>{
        assertName(
          User.findOneAndUpdate({ name: 'Joe'},{ name: 'Alex'}),
          done
        ); 
     });
     it('A model class can find a record with an Id and Update', (done) =>{
        assertName(
          User.findByIdAndUpdate(joe._id, { name: 'Alex'}),
          done
        ); 
     });
    
});
