const request =  require('supertest');
const app = require('../../app');
const { sequelize } = require('../../models/index');
const { queryInterface } = sequelize; 

// Minor Data for Testing
let registerEndPoint = "/public/register";

beforeAll(async () => {
    // Query Bulk Delete to Database
    await queryInterface.bulkDelete('Users', null, {
        truncate: true,
        restartIdentity: true,
        cascade: true
    });
})

describe('TEST /public/register Feature', () => {
    // -- Start of POST --
    test('POST /public/register should return 201', (done) => {
        const testData = { 
            email: "test_user_1@mail.com",
            password: "testuser123",
            username: "test_user_1",
            address: "Jakarta, Indonesia",
            phoneNumber: "+62808909023"
        };

        request(app)
        .post(`${registerEndPoint}`)
        .expect(201)
        .send(testData)
        .set('Content-Type', 'application/json')
        .then(({ body }) => {
            expect(body.messages).toMatchObject({
                id: expect.any(Number),
                email: testData.email
            })
            done();
        })
        .catch((error) => {
            done(error);
        })
    });

    test('POST /public/register without email should return 400', (done) => {
        const testData = {
            password: "testuser123",
            username: "test_user_2",
            address: "Jakarta, Indonesia",
            phoneNumber: "+62808909023"
        };

        request(app)
        .post(`${registerEndPoint}`)
        .expect(400)
        .send(testData)
        .set('Content-Type', 'application/json')
        .then(({ body }) => {
            expect(body).toMatchObject({
                messages: [
                    "Email is required"
                ]
            })
            done();
        })
        .catch((error) => {
            done(error);
        })
    })

    test('POST /public/register without password should return 400', (done) => {
        const testData = {
            email: "test_user_2@mail.com",
            username: "test_user_2",
            address: "Jakarta, Indonesia",
            phoneNumber: "+62808909023"
        };

        request(app)
        .post(`${registerEndPoint}`)
        .expect(400)
        .send(testData)
        .set('Content-Type', 'application/json')
        .then(({ body }) => {
            expect(body).toMatchObject({
                messages: [
                    "Password is required"
                ]
            })
            done();
        })
        .catch((error) => {
            done(error);
        })
    })

    test('POST /public/register with empty string on email should return 400', (done) => {
        const testData = {
            email: "", 
            password: "testuser123",
            username: "test_user_3",
            address: "Jakarta, Indonesia",
            phoneNumber: "+62808909023"
        };

        request(app)
        .post(`${registerEndPoint}`)
        .expect(400)
        .send(testData)
        .set('Content-Type', 'application/json')
        .then(({ body }) => {
            expect(body).toMatchObject({
                messages: [
                    "Email cannot be empty",
                    "Email format is not valid"
                ]
            })
            done();
        })
        .catch((error) => {
            done(error);
        })
    })

    test('POST /public/register with empty string on password should return 400', (done) => {
        const testData = {
            email: "test_user_4@mail.com",
            password: "", 
            username: "test_user_4",
            address: "Jakarta, Indonesia",
            phoneNumber: "+62808909023"
        };

        request(app)
        .post(`${registerEndPoint}`)
        .expect(400)
        .send(testData)
        .set('Content-Type', 'application/json')
        .then(({ body }) => {
            expect(body).toMatchObject({
                messages: [
                    "Password length minimum 5",
		            "Password cannot be empty"
                ]
            })
            done();
        })
        .catch((error) => {
            done(error);
        })
    })

    test('POST /public/register with registered or used email should return 409', (done) => {
        const testData = { 
            email: "test_user_1@mail.com",
            password: "testuser123",
            username: "test_user_5",
            address: "Jakarta, Indonesia",
            phoneNumber: "+62808909023"
        };

        request(app)
        .post(`${registerEndPoint}`)
        .expect(409)
        .send(testData)
        .set('Content-Type', 'application/json')
        .then(({ body }) => {
            expect(body).toMatchObject({
                messages: [
                    "Email is already used by other users"
                ]
            })
            done();
        })
        .catch((error) => {
            done(error);
        })
    })

    test('POST /public/register with registered or taken username should return 409', (done) => {
        const testData = { 
            email: "test_user_6@mail.com",
            password: "testuser123",
            username: "test_user_1",
            address: "Jakarta, Indonesia",
            phoneNumber: "+62808909023"
        };

        request(app)
        .post(`${registerEndPoint}`)
        .expect(409)
        .send(testData)
        .set('Content-Type', 'application/json')
        .then(({ body }) => {
            expect(body).toMatchObject({
                messages: [
                    "Username is already taken by other users"
                ]
            })
            done();
        })
        .catch((error) => {
            done(error);
        })
    })
    
    test('POST /public/register with invalid email format should return 400 ', (done) => {
        const testData = { 
            email: "test_user_8",
            password: "testuser123",
            username: "test_user_8",
            address: "Jakarta, Indonesia",
            phoneNumber: "+62808909023"
        };

        request(app)
        .post(`${registerEndPoint}`)
        .expect(400)
        .send(testData)
        .set('Content-Type', 'application/json')
        .then(({ body }) => {
            expect(body).toMatchObject({
                messages: [
                    "Email format is not valid"
                ]
            })
            done();
        })
        .catch((error) => {
            done(error);
        })
    })

    test('POST /public/register without filling any fields should return 400', (done) => {
        const testData = {};

        request(app)
        .post(`${registerEndPoint}`)
        .expect(400)
        .send(testData)
        .set('Content-Type', 'application/json')
        .then(({ body }) => {
            expect(body).toMatchObject({
                messages: [
                    "Username is required",
                    "Email is required",
                    "Password is required",
                    "Phone Number is required",
                    "Address is required"
                ]
            })
            done();
        })
        .catch((error) => {
            done(error);
        })
    })

    test('POST /public/register without one of the required fields should return 400', (done) => {
        const testData = { 
            email: "test_user_7@mail.com",
            password: "testuser123",
            username: "test_user_7",
            address: "Jakarta, Indonesia"
        };

        request(app)
        .post(`${registerEndPoint}`)
        .expect(400)
        .send(testData)
        .set('Content-Type', 'application/json')
        .then(({ body }) => {
            expect(body).toMatchObject({
                messages: [
                    "Phone Number is required"
                ]
            })
            done();
        })
        .catch((error) => {
            done(error);
        })
    })

    test('POST /public/register with password length that less than 5 characters should return 400', (done) => {
        const testData = { 
            email: "test_user_9@mail.com",
            password: "test",
            username: "test_user_9",
            address: "Jakarta, Indonesia",
            phoneNumber: "+62808909023"
        };

        request(app)
        .post(`${registerEndPoint}`)
        .expect(400)
        .send(testData)
        .set('Content-Type', 'application/json')
        .then(({ body }) => {
            expect(body).toMatchObject({
                messages: [
                    "Password length minimum 5"
                ]
            })
            done();
        })
        .catch((error) => {
            done(error);
        })
    })

    test('POST /public/register with phone number length that less than 6 characters or more than 50 characters should return 400', (done) => {
        const testData = { 
            email: "test_user_10@mail.com",
            password: "testuser123",
            username: "test_user_10",
            address: "Jakarta, Indonesia",
            phoneNumber: "+6"
        };

        request(app)
        .post(`${registerEndPoint}`)
        .expect(400)
        .send(testData)
        .set('Content-Type', 'application/json')
        .then(({ body }) => {
            expect(body).toMatchObject({
                messages: [
                    "Phone Number is Invalid, must between 6 - 50 characters"
                ]
            })
            done();
        })
        .catch((error) => {
            done(error);
        })
    })

    test('POST /public/register with address length that less than 3 characters should return 400', (done) => {
        const testData = { 
            email: "test_user3@mail.com",
            password: "testuser123",
            username: "test_user3",
            address: "Ja",
            phoneNumber: "+62808909023"
        };

        request(app)
        .post(`${registerEndPoint}`)
        .expect(400)
        .send(testData)
        .set('Content-Type', 'application/json')
        .then(({ body }) => {
            expect(body).toMatchObject({
                messages: [
                    "Address length minimum 3"
                ]
            })
            done();
        })
        .catch((error) => {
            done(error);
        })
    })

    // -- End of POST --
})
