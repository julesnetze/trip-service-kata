"use strict";

let UserSession = require('./UserSession');
let TripDAO = require('./TripDAO');

class TripService {
    getTripsByUser(friend, loggedInUser) {
        if (loggedInUser == null) {
            throw new Error('User not logged in.');
        }
        return (friend.checkFriend(loggedInUser)) ? this.tripsByUser(friend) : this.noTrips();
    }

    noTrips() {
        return new Array;
    }

    tripsByUser(user) {
        return TripDAO.findTripsByUser(user)
    }
    
}

module.exports = TripService
