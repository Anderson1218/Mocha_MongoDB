const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () => {
    it('requires a user name', () => {
        const user = new User({name: undefined});
        const validateResult = user.validateSync();
        const { message } = validateResult.errors.name;
        assert(message === 'Name is required');
        console.log('in validtatiing');
    });

    it('requires a user\'s name longer than 2 characters', () => {
        const user = new User({ name: 'Al'});
        const validateResult = user.validateSync();
        const {message} = validateResult.errors.name;
        assert(message === 'Name must be longer than 2 characters.');
    });

    it('disallows invalid records from being saved', (done) => {
        const user = new User({ name: 'Al'});
        user.save()
            .catch((validateResult) => {
                const {message} = validateResult.errors.name;
                assert(message === 'Name must be longer than 2 characters.');
                done();
            });
    })

});