const userReducer = require("./redux/userReducer");

//---------ESTEBAN'S TESTS--------------------------------------------------------
describe("Rider Properties: ", () => {

    test("riderLogin should be a function", () => {
        expect(typeof userReducer.riderLogin).toBe('function')
    });

    test("riderLogin response should be an object", () => {
        let incorrectUsername = "wrongUsername";
        let randomPassword = ";dsakfjdsa";
        expect(userReducer.riderLogin(incorrectUsername, randomPassword)).toBeInstanceOf(Object);
    });
    test("Incorrect rider login request type should be 'RIDER_LOGIN'", () => {
        let incorrectUsername = "bento";
        let randomPassword = "0";
        let functionResponse = userReducer.riderLogin(incorrectUsername, randomPassword);
        expect(functionResponse.type).toEqual("RIDER_LOGIN");
    });
    test("riderSignup response should be an object", () => {
        let incorrectUsername = "wrongUsername";
        let randomPassword = ";dsakfjdsa";
        expect(userReducer.riderSignup(incorrectUsername, randomPassword)).toBeInstanceOf(Object);
    });
    test("Incorrect rider signup request type should be 'RIDER_SIGNUP'", () => {
        let incorrectUsername = "bento";
        let randomPassword = "0";
        let functionResponse = userReducer.riderSignup(incorrectUsername, randomPassword);
        expect(functionResponse.type).toEqual("RIDER_SIGNUP");
    });

});
