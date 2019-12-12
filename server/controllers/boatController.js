// const inventoryItems = [];
// let id = 0;


module.exports = {

    createBoat: async (req, res) => {
        let { boatName, tierId, boatDescription, boatLicense, boatRegistration, boatMake, boatModel,
            boatSeatNum, tubeSeatNum, boatImageOne, driverId } = req.body;
        const db = req.app.get("db");
        let [boat] = await db.create_boat(boatName, tierId, boatDescription, boatLicense, boatRegistration, boatMake, boatModel,
            boatSeatNum, tubeSeatNum, boatImageOne, driverId);
        req.session.boat = {
            boatDescription: boat.boat_description,
            boatId: boat.boat_id,
            boatImage: boat.boat_image_one,
            boatLicense: boat.boat_license,
            boatMake: boat.boat_make,
            boatModel: boat.boat_model,
            boatName: boat.boat_name,
            boatRegistration: boat.boat_registration,
            boatSeatNumber: boat.boat_seat_number,
            tierId: boat.tier_id
        }
        res.status(200).send(req.session.boat);
    },
    
    editBoat: async (req, res) => {
        let {
            driverId,
            newBoatName,
            newBoatDescription,
            newBoatLicense,
            newBoatRegistration,
            newBoatMake,
            newBoatModel,
            newBoatSeatNumber,
            newBoatImageOne,
            newTubeSeatNumber,
            newTierId
        } = req.body;
        const db = req.app.get("db");
        let [boat] = await db.edit_boat([
            driverId,
            newBoatName,
            newBoatDescription,
            newBoatLicense,
            newBoatRegistration,
            newBoatMake,
            newBoatModel,
            +newBoatSeatNumber,
            newBoatImageOne,
            +newTubeSeatNumber,
            +newTierId
        ])
        req.session.boat = {
            boatId: boat.boat_id,
            boatName: boat.boat_name,
            boatDescription: boat.boat_description,
            boatLicense: boat.boat_license,
            boatRegistration: boat.boat_registration,
            boatMake: boat.boat_make,
            boatModel: boat.boat_model,
            boatSeatNumber: boat.boat_seat_number,
            tubeSeatNumber: boat.boat_tube_seats,
            tierId: boat.tier_id,
            boatImageOne: boat.boat_image_one
        }
        res.status(200).send(req.session.boat);
    },

    getBoatByDriverId: async (req, res) => {
        let { driverId } = req.params
        const db = req.app.get('db')
        let [boat] = await db.get_boat(driverId)

        req.session.boat = {
            boatId: boat.boat_id,
            boatName: boat.boat_name,
            boatDescription: boat.boat_description,
            boatLicense: boat.boat_license,
            boatRegistration: boat.boat_registration,
            boatMake: boat.boat_make,
            boatModel: boat.boat_model,
            boatSeatNumber: boat.boat_seat_number,
            tubeSeatNumber: boat.boat_tube_seats,
            tierId: boat.tier_id,
            boatImageOne: boat.boat_image_one
        }

        res.status(200).send(req.session.boat)
    }
}