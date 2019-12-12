const stripe = require('stripe')(process.env.REACT_APP_STRIPE_KEY)

module.exports = {
    pay: (req, res) => {
        const db = req.app.get('db')
        const {userId} = req.params
        const {token: {id}, ridePrice, ride_id, newTubeSeatCount, locationLatitude, locationLongitude, radius } = req.body
        let adjRidePrice = ridePrice / 100
        console.log('From stripe controller', userId, id, ridePrice)
        stripe.charges.create(
            {
                amount: ridePrice,
                currency: 'usd',
                source: id,
                description: 'Test Charge'
            },
            async (err, charge) => {
                if(err){
                    console.log(err)
                    return res.status(500).send(err)
                } else {
                    let rides = await db.buy_ride([+userId, +ride_id, +newTubeSeatCount, id, adjRidePrice, locationLatitude, locationLongitude, radius])
                    res.send(rides)
                    console.log('Payment Successful, order placed', charge)
                }
            }
        )
    }
}