const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
    login: async function(req, res){
        let {driverUsername, driverPassword} = req.body;
        const db = req.app.get("db");
        //Check if user exists
        let [existingUser] = await db.get_driver_by_username(driverUsername);
        //If user does not exist
        if(!existingUser) return res.status(401).send("Username not found");
        let resultPassword = await bcrypt.compare(driverPassword, existingUser.driver_password);
        delete existingUser.driverPassword;
        console.log("existinguser is ",existingUser);
        //Check if Password is correct
        if(resultPassword){
            req.session.user = {
                isDriver: false,
                driverUsername: existingUser.driver_username,
                driverFirstName: existingUser.driver_first_name,
                driverLastName: existingUser.driver_last_name,
                driverId: existingUser.driver_id,
                driverEmail: existingUser.driver_email,
                driverImageUrl: existingUser.driver_image_url,
                driverRating: existingUser.driver_rating,
                driverLicense: existingUser.driver_license,
                loggedIn: true
            }
            res.send(req.session.user);
        }else{
            res.status(401).send("Username or Password is Incorrect");
        }
    },
    signup: async function(req, res){

        let {driverUsername, driverPassword} = req.body;
        const db = req.app.get("db");
        //Check if username does not exist
        let [existingUser] = await db.get_driver_by_username(driverUsername);
        //If username does exist
        if(existingUser) return res.status(400).send("Username already taken");

        //Encrypt Password
        let salt = await bcrypt.genSalt(saltRounds);
        let hashPassword = await bcrypt.hash(driverPassword, salt);
        let [ user ] = await db.create_driver( [ driverUsername, hashPassword ]);
        req.session.user = {
            driverUsername: user.driverUsername, 
            id: user.driver_id,

            loggedIn: true
        }

        res.send(req.session.user);
        
    },
    logout: async function(req, res){
        req.session.destroy();
        res.sendStatus(200);
    },
    getDriver: async function(req, res){
        if(req.session.user){
            if(req.session.user.loggedIn){
                res.status(200).send(req.session.user);
            }else{
                res.status(401).send("Unauthorised access, please log in to continue");
            }
        }
    },
    driverRegister: async (req, res) => {
        let { driverUsername, driverEmail, driverFirst, driverLast, driverImage, driverLicense, startRating } = req.body;
        const db = req.app.get("db");
        console.log(req.body);
        let user = await db.driver_register([driverUsername, driverEmail, driverFirst, driverLast, driverImage, driverLicense, startRating])
        console.log("driver register user is ", user);
        res.status(200).send(user);
    }
}