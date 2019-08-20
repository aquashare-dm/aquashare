module.exports = {
    getRides: async function(req, res){
        console.log('Hit the controller!')
        let { firstDate, secondDate, numberOfRiders } = req.body
        const db = req.app.get("db");
        let trips = await db.get_rides_by_criteria([firstDate, secondDate, numberOfRiders]);
        res.send(trips)
    }
}