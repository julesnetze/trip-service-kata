var sinon = require('sinon');
let assert = require('assert');

let User = require('../src/User');
let UserBuilder = require('./UserBuilder');

describe('User Test', () => {

    const Steve = new User();
    const Bob = new User();
    
    it('should return true when users are friends', () => {
        let user = UserBuilder.aUser().friendsWith(Bob, Steve).build();
        assert.equal(user.checkFriend(Bob), true)
    });

    it('should return false when users are not friends', () => {
        let user = UserBuilder.aUser().friendsWith(Steve).build();
        assert.equal(user.checkFriend(Bob), false)
    });
});