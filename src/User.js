"use strict";

module.exports = class User {
    constructor() {
        this.friends = [];
        this.trips = [];
    }

    addFriend(user) {
        this.friends.push(user)
    }

    getFriends() {
        return this.friends
    }

    addTrip(destination) {
        this.trips.push(destination)
    }

    getTrips() {
        return this.trips
    }
}