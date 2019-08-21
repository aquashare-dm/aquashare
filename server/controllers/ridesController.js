module.exports = {
    getRides: async function(req, res){
        let { locationLatitude, locationLongitude, numberOfRiders, radius } = req.body
        const db = req.app.get("db");
        let rides = await db.get_rides_by_criteria([locationLatitude, locationLongitude, numberOfRiders, radius]);
        res.send(rides)
    },
    getPastRides: async function(req, res){
        console.log('Hit the getPastRides in controller!')
        let {userId} = req.params;
        const db = req.app.get("db");
        let rides = await db.get_rides_by_username(+userId);
        res.send(rides)
    }
}