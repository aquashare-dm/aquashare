const userReducer = require("./redux/userReducer");
const requestReducer = require("./redux/requestReducer")


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

//Tori's tests


describe('Test paths', () => {

    test("createRequest should be a function", () => {
        expect(typeof requestReducer.createRequest).toBe('function')
    });
    test("createRequest response should be an object", () => {
        let requestDate = "August 30 2019"
        let requestSeatNum = "3"
        let tierId = 1
        let requestStartTime = 13
        let requestEndTime = 14
        expect(userReducer.riderLogin(requestDate, requestSeatNum, tierId, requestStartTime, requestEndTime)).toBeInstanceOf(Object);
    });
    test("editRequest response should be an object", () => {
        let requestDate = "September 30 2019"
        let requestSeatNum = "8"
        let tierId = 2
        let requestStartTime = 14
        let requestEndTime = 18
        expect(requestReducer.editRequest(requestDate, requestSeatNum, tierId, requestStartTime, requestEndTime)).toBeInstanceOf(Object);
    });
    test('Response for creating a requested ride should be 200', () => {
        return request(requestReducer).post("/api/create-request").then(res => {
            expect(res.statusCode).toBe(200)
        })
    })
    test('Response for retrieving available requests should be 200', () => {
        return request(requestReducer).get(`/api/get-available-requests/${driverId}`).then(res => {
            expect(res.statusCode).toBe(200)
        })
    })
})