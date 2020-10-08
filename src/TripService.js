class TripService {
    constructor(tripDataAccessObject) {
        this.tripDataAccessObject = tripDataAccessObject
    }
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
        return this.tripDataAccessObject.findTripsByUser(user)
    }
    
}

module.exports = TripService
