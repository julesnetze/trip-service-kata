"use strict";

var expect = require('chai').expect
var sinon = require('sinon');

let assert = require('assert');
let TripService = require('../src/TripService');
let User = require('../src/User');

describe('TripService', () => {

    var LoggedInUser = new User()
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
        let friend = new User()
        expect(function() {
            testTripService.getTripsByUser(friend)
        }).to.throw(Error)
     });

     it('should return an array of 0 trips when users are not friends', () => {

        let friend = new User()
        let aFriend = new User()
        friend.addFriend(aFriend)
        friend.addTrip("Brasil")
        assert.equal(testTripService.getTripsByUser(friend).length, 0)
     });


     it('should return an array with trips when users are friends', () => {
        let friend = new User()
        let aFriend = new User()
        friend.addFriend(aFriend)
        friend.addFriend(LoggedInUser)
        friend.addTrip("Brasil");
        friend.addTrip("London");
        assert.equal(testTripService.getTripsByUser(friend).length, 2)
     });

     

})
