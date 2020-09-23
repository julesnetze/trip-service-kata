"use strict";

let UserSession = require('./UserSession');
let TripDAO = require('./TripDAO');

class TripService {
    getTripsByUser(friend) {
        if (this.getLoggedUser() == null) {
            throw new Error('User not logged in.');
        }
        return (friend.checkFriend(this.getLoggedUser())) ? this.tripsByUser(friend) : this.noTrips();
    }

    noTrips() {
        return new Array;
    }

    getLoggedUser() {
        return UserSession.getLoggedUser()
    }

    tripsByUser(user) {
        return TripDAO.findTripsByUser(user)
    }
    
}

module.exports = TripService
