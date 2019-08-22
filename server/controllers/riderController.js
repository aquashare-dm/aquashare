const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
    login: async function (req, res) {
        console.log("hit login, req body is ", req.body);
        let { riderUsername, riderPassword } = req.body;
        const db = req.app.get("db");
        //Check if user exists
        let [existingUser] = await db.get_rider_by_username(riderUsername);
        //If user does not exist
        if (!existingUser) return res.status(401).send("Username not found");
        let resultPassword = await bcrypt.compare(riderPassword, existingUser.rider_password);
        delete existingUser.riderPassword;
        console.log("existinguser is ", existingUser);
        //Check if Password is correct
        if (resultPassword) {
            req.session.user = {
                isDriver: false,
                riderUsername: existingUser.rider_username,
                riderFirst: existingUser.rider_first_name,
                riderLast: existingUser.rider_last_name,
                id: existingUser.rider_id,
                riderEmail: existingUser.rider_email,
                riderImage: existingUser.rider_image_url,
                riderRating: existingUser.rider_rating,
                loggedIn: true
            }
            res.send(req.session.user);
        } else {
            res.status(401).send("Username or Password is Incorrect");
        }
    },
    signup: async function (req, res) {

        let { riderUsername, riderPassword } = req.body;
        const db = req.app.get("db");
        //Check if username does not exist
        let [existingUser] = await db.get_rider_by_username(riderUsername);
        //If username does exist
        if (existingUser) return res.status(400).send("Username already taken");

        //Encrypt Password
        let salt = await bcrypt.genSalt(saltRounds);
        let hashPassword = await bcrypt.hash(riderPassword, salt);
        let [user] = await db.create_rider([riderUsername, hashPassword]);
        req.session.user = {
            riderUsername: user.rider_username,
            id: user.rider_id,
            isDriver: false,
            loggedIn: true
        }

        res.send(req.session.user);

    },
    logout: async function (req, res) {
        req.session.destroy();
        res.sendStatus(200);
    },
    getRider: async function (req, res) {
        if (req.session.user) {
            if (req.session.user.loggedIn) {
                res.status(200).send(req.session.user);
            } else {
                res.status(401).send("Unauthorized access, please log in to continue");
            }
        }
    },
    riderRegister: async (req, res) => {
        let { riderUsername, riderEmail, riderFirst, riderLast, riderImage, startRating } = req.body;
        const db = req.app.get("db");
        let [user] = await db.rider_register([riderUsername, riderEmail, riderFirst, riderLast, riderImage, startRating])
        req.session.user = {
            riderUsername: user.rider_username,
            riderFirst: user.rider_first_name,
            riderLast: user.rider_last_name,
            riderEmail: user.rider_email,
            riderImage: user.rider_image_url,
            riderRating: user.rider_rating,
            id: user.rider_id,
            isDriver: false,
            loggedIn: true
        }
        res.send(req.session.user);
    },
    async editRiderProfile(req, res) {
        let { riderUsername, newRiderEmail, newRiderFirst, newRiderLast, newRiderImage } = req.body;
        const db = req.app.get('db');
        let [user] = await db.edit_rider_profile([
            riderUsername,
            newRiderEmail,
            newRiderFirst,
            newRiderLast,
            newRiderImage
        ]);
        console.log(user)
        req.session.user = {
            riderUsername: user.rider_username,
            riderFirst: user.rider_first_name,
            riderLast: user.rider_last_name,
            riderEmail: user.rider_email,
            riderImage: user.rider_image_url,
            riderRating: user.rider_rating,
            id: user.rider_id,
            isDriver: false,
            loggedIn: true
        }
        console.log(req.session.user)
        res.send(req.session.user);
    }
}