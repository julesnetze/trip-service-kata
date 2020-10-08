var expect = require('chai').expect
let assert = require('assert');
const { stub } = require('sinon');

let TripService = require('../src/TripService');
let TripDAO = require('../src/TripDAO');
let User = require('../src/User');
let UserBuilder = require('./UserBuilder');

describe('TripService', () => {

    let loggedInUser = new User()
    let anotherUser = new User()
    let notLoggedInUser = null
    stub(TripDAO, "findTripsByUser", (user) => user.getTrips())
    let tripService = new TripService(TripDAO);

    it('should throw an error if user is not logged in ', () => {
        let friend = UserBuilder.aUser().friendsWith(notLoggedInUser).build()
        expect(function() {
            tripService.getTripsByUser(friend, notLoggedInUser)
        }).to.throw('User not logged in.');
     });

     it('should return an array of 0 trips when users are not friends', () => {
        let friend = UserBuilder.aUser().friendsWith(anotherUser).withTrips("Brasil").build()
        assert.equal(tripService.getTripsByUser(friend, loggedInUser).length, 0)
    });
    
    it('should return an array with trips when users are friends', () => {
        let friend = UserBuilder.aUser().friendsWith(anotherUser, loggedInUser).withTrips("Brasil", "London").build()
        assert.equal(tripService.getTripsByUser(friend, loggedInUser).length, 2)
     });

})
