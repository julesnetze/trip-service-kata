"use strict";

var expect = require('chai').expect
var sinon = require('sinon');

let assert = require('assert');
let TripService = require('../src/TripService');
let User = require('../src/User');
let UserBuilder = require('./UserBuilder');

describe('TripService', () => {

    var LoggedInUser = new User()
    let anotherUser = new User();
    
    class TestTripService extends TripService {
        getLoggedUser() {
            return LoggedInUser;
        }
        tripsByUser(user) {
            return user.getTrips()
        }
    }
    let testTripService = new TestTripService()

    it('should throw an error if user is not logged in ', () => {
        var LoggedInUser = null
        class TestTripService extends TripService {
            getLoggedUser() {
                return LoggedInUser;
            }
        }
        let testTripService = new TestTripService()
        let friend = UserBuilder.aUser()
        expect(function() {
            testTripService.getTripsByUser(friend)
        }).to.throw(Error)
     });

     it('should return an array of 0 trips when users are not friends', () => {
        let friend = UserBuilder.aUser().friendsWith(anotherUser).withTrips("Brasil").build()
        assert.equal(testTripService.getTripsByUser(friend).length, 0)
     });

     it('should return an array with trips when users are friends', () => {
        let friend = UserBuilder.aUser().friendsWith(anotherUser, LoggedInUser).withTrips("Brasil", "London").build()
        assert.equal(testTripService.getTripsByUser(friend).length, 2)
     });

})
