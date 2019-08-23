// const inventoryItems = [];
// let id = 0;


module.exports = {

    createBoat: async (req, res) => {
        let { boat_name, tier_id, boat_description, boat_license, boat_registration, boat_make, boat_model,
            boat_seat_number, boat_image_one, boat_image_two, driver_id } = req.body;
        const db = req.app.get("db");
        let [boat] = await db.create_boat(boat_name, tier_id, boat_description, boat_license, boat_registration, boat_make, boat_model,
            boat_seat_number, boat_image_one, boat_image_two, driver_id);
        req.session.boat = {
            boatDescription: boat.boat_description,
            boatId: boat.boat_id,
            boatImageOne: boat.boat_image_one,
            boatImageTwo: boat.boat_image_two,
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
            boatId,
            newBoatName,
            newBoatDescription,
            newBoatLicense,
            newBoatRegistration,
            newBoatMake,
            newBoatModel,
            newBoatSeatNumber,
            newBoatImageOne,
            newBoatImageTwo,
        } = req.body;
        const db = req.app.get("db");
        console.log(req.body)
        let [boat] = await db.edit_boat([
            boatId,
            newBoatName,
            newBoatDescription,
            newBoatLicense,
            newBoatRegistration,
            newBoatMake,
            newBoatModel,
            newBoatSeatNumber,
            newBoatImageOne,
            newBoatImageTwo,
        ])
        console.log('BOOOOOOAAAT', boat)
        req.session.boat = {
            boatId: boat.boat_id,
            boatName: boat.boat_name,
            boatDescription: boat.boat_description,
            boatLicense: boat.boat_license,
            boatRegistration: boat.boat_registration,
            boatMake: boat.boat_make,
            boatModel: boat.boat_model,
            boatSeatNumber: boat.boat_seat_number,
            boatImageOne: boat.boat_image_one,
            boatImageTwo: boat.boat_image_two,
        }
        console.log(req.session.boat)
        res.status(200).send(req.session.boat);
    },

}