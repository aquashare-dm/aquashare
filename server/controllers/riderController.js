const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
    login: async function(req, res){
        console.log("hit login, req body is ", req.body);
        let {riderUsername, riderPassword} = req.body;
        const db = req.app.get("db");
        //Check if user exists
        let [existingUser] = await db.get_rider_by_username(riderUsername);
        //If user does not exist
        if(!existingUser) return res.status(401).send("Username not found");
        let resultPassword = await bcrypt.compare(riderPassword, existingUser.rider_password);
        delete existingUser.riderPassword;
        console.log("existinguser is ",existingUser);
        //Check if Password is correct
        if(resultPassword){
            req.session.user = {
                isDriver: false,
                riderUsername: existingUser.rider_username,
                riderFirstName: existingUser.rider_first_name,
                riderLastName: existingUser.rider_last_name,
                riderId: existingUser.rider_id,
                riderEmail: existingUser.rider_email,
                riderImageUrl: existingUser.rider_image_url,
                loggedIn: true
            }
            res.send(req.session.user);
        }else{
            res.status(401).send("Username or Password is Incorrect");
        }
    },
    signup: async function(req, res){

        let {riderUsername, riderPassword} = req.body;
        const db = req.app.get("db");
        //Check if username does not exist
        let [existingUser] = await db.get_rider_by_username(riderUsername);
        //If username does exist
        if(existingUser) return res.status(400).send("Username already taken");

        //Encrypt Password
        let salt = await bcrypt.genSalt(saltRounds);
        let hashPassword = await bcrypt.hash(riderPassword, salt);
        let [ user ] = await db.create_rider( [ riderUsername, hashPassword ]);
        req.session.user = {
            riderUsername: user.riderUsername, 
            id: user.rider_id,

            loggedIn: true
        }

        res.send(req.session.user);
        
    },
    logout: async function(req, res){
        req.session.destroy();
        res.sendStatus(200);
    },
    getRider: async function(req, res){
        if(req.session.user){
            if(req.session.user.loggedIn){
                res.status(200).send(req.session.user);
            }else{
                res.status(401).send("Unauthorised access, please log in to continue");
            }
        }
    }
}