const assert = require('assert');
const User = require('../src/user');

describe('Creating records', () =>{
    it('saves a user', (done)=>{
        const joe = new User({ name: 'Joe'});
        //save() is Async method
        joe.save()
          .then(() => {
              console.log('in create');
              assert(!joe.isNew);
              done();
          })
          .catch(e => console.error(e));
    });
    
});