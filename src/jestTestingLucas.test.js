const userReducer = require("./redux/userReducer");

//---------LUCAS'S TESTS--------------------------------------------------------
describe("Rider Properties: ", () => {

    test("driverLogin should be a function", () => {
        expect(typeof userReducer.driverLogin).toBe('function')
    });

    test("driverSignup should be a function", () => {
        expect(typeof userReducer.driverSignup).toBe('function')
    });
    
    test("driverLogin response should be an object", () => {
        let incorrectUsername = "gsWarriors";
        let randomPassword = "0";
        expect(userReducer.driverLogin(incorrectUsername, randomPassword)).toBeInstanceOf(Object);
    });
    test("Incorrect driver login request type should be 'RIDER_LOGIN'", () => {
        let incorrectUsername = "gsWarriors";
        let randomPassword = "0";
        let functionResponse = userReducer.driverLogin(incorrectUsername, randomPassword);
        expect(functionResponse.type).toEqual("DRIVER_LOGIN");
    });
    test("driverSignup response should be an object", () => {
        let username = "gsWarriors";
        let password = "0";
        expect(userReducer.driverSignup(username, password)).toBeInstanceOf(Object);
    });
    test("Driver signup request type should be 'DRIVER_SIGNUP'", () => {
        let newUsername = "gsWarrior";
        let randomPassword = "lmnop";
        let functionResponse = userReducer.driverSignup(newUsername, randomPassword);
        expect(functionResponse.type).toEqual("DRIVER_SIGNUP");
    });

});
