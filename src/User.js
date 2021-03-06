module.exports = class User {
    constructor() {
        this.friends = [];
        this.trips = [];
    }

    addFriend(user) {
        this.friends.push(user)
    }

    addTrip(trip) {
        this.trips.push(trip)
    }

    getTrips() {
        return this.trips
    }

    checkFriend(user) {
        return this.friends.includes(user);
    }
}