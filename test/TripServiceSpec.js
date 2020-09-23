"use strict";

var expect = require('chai').expect
var sinon = require('sinon');

let assert = require('assert');
let TripService = require('../src/TripService');
let User = require('../src/User');
let UserBuilder = require('./UserBuilder');

describe('TripService', () => {

    var loggedInUser = new User()
    let anotherUser = new User();
    
    class TestTripService extends TripService {
        tripsByUser(user) {
            return user.getTrips()
        }
    }
    let testTripService = new TestTripService()

    it('should throw an error if user is not logged in ', () => {
        var loggedInUser = null
        let friend = UserBuilder.aUser().friendsWith(loggedInUser).build()
        expect(function() {
            testTripService.getTripsByUser(friend, loggedInUser)
        }).to.throw('User not logged in.');
     });

     it('should return an array of 0 trips when users are not friends', () => {
        let friend = UserBuilder.aUser().friendsWith(anotherUser).withTrips("Brasil").build()
        assert.equal(testTripService.getTripsByUser(friend, loggedInUser).length, 0)
    });
    
    it('should return an array with trips when users are friends', () => {
        let friend = UserBuilder.aUser().friendsWith(anotherUser, loggedInUser).withTrips("Brasil", "London").build()
        assert.equal(testTripService.getTripsByUser(friend, loggedInUser).length, 2)
     });

})
