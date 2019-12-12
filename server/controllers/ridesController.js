module.exports = {
    getRides: async function (req, res) {
        let { locationLatitude, locationLongitude, radius } = req.body
        const db = req.app.get("db");
        let rides = await db.get_rides_by_criteria([locationLatitude, locationLongitude, radius]);
        res.send(rides)
    },
    getRidesById: async function (req, res) {
        let { userId } = req.params;
        const db = req.app.get("db");
        let rides = await db.get_rides_by_username(+userId);
        res.send(rides)
    },

    getRidesByDriverId: async function (req, res) {
        let { userId } = req.params;
        const db = req.app.get("db");
        let rides = await db.get_rides_by_driver_id(+userId);
        res.send(rides)
    },

    getConfirmedRidesByDriverId: async function (req, res) {
        let { driverId } = req.params;
        const db = req.app.get("db");
        let rides = await db.get_confirmed_rides_by_driver_id(+driverId);
        res.send(rides)
    },

    createRide: async (req, res) => {
        let { driverId, date, location, locationLatitude, locationLongitude, startTime, endTime } = req.body
        const db = req.app.get('db')
        let [ride] = await db.create_ride([driverId, date, location, locationLatitude, locationLongitude, startTime, endTime])
        req.session.ride = {

            date: ride.ride_date,
            driverId: ride.driver_id,
            location: ride.ride_location,
            locationLatitude: ride.ride_location_lat,
            locationLongitude: ride.ride_location_long,
            boatSeatNum: ride.ride_total_seats,
            tripSeatNum: ride.ride_open_seats,
            startTime: ride.ride_start_time,
            endTime: ride.ride_end_time,
            tierId: ride.tier_id
        }
        res.status(200).send(req.session.ride)
    },

    // buyRide: async (req, res) => {
    //     let { riderId, rideId, newTubeSeatCount } = req.body
    //     const db = req.app.get('db')
    //     let rides = await db.buy_ride([+riderId, +rideId, +newTubeSeatCount])
    //     res.send(rides)
    // },
}
