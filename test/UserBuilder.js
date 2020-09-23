let User = require('../src/User');

class UserBuilder {
    constructor() {
        this.friends = [];
        this.trips = [];
    }
    
    static aUser() {
        return new UserBuilder();
    }

    friendsWith(...friends) {
        this.friends = friends;
        return this;
    }

    withTrips(...trips) {
        this.trips = trips;
        return this;
    }

    addFriendsTo(user){
        this.friends.forEach(friend => user.addFriend(friend))
    }

    addTripsTo(user){
        this.trips.forEach(trip => user.addTrip(trip))
    }

    build() {
        let user = new User();
        this.addFriendsTo(user);
        this.addTripsTo(user);
        return user;
    }
}

module.exports = UserBuilder;