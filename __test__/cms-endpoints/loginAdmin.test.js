const request = require('supertest');
const app = require('../../app');
const { hashPassword } = require('../../helpers/hash-helper');
const { sequelize } = require('../../models/index');
const { queryInterface } = sequelize;

// Minor Data for Testing
let loginEndPoint = "/login";

beforeAll(async () => {
    // Query Bulk Delete to Database
    await queryInterface.bulkDelete('Users', null, {
        truncate: true,
        restartIdentity: true,
        cascade: true
    });

    // Query Bulk Insert to Database
    await queryInterface.bulkInsert('Users', [
        {
            username: "test_user_1",
            email: "test_user_1@mail.com",
            password: hashPassword("testuser123"),
            role: "Staff",
            address: "Indonesia",
            phoneNumber: "+62139876543",
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            username: "test_user_2",
            email: "test_user_2@mail.com",
            password: hashPassword("testuser123"),
            role: "Customer",
            address: "Indonesia",
            phoneNumber: "+62139876543",
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ], {});
})

describe('TEST /login CMS End Point Feature', () => {
    // -- Start of POST --
    test('POST /login should return 200 and access_token', (done) => {
        const testData = {
            email: "test_user_1@mail.com",
            password: "testuser123"
        };

        request(app)
        .post(`${loginEndPoint}`)
        .expect(200)
        .send(testData)
        .set('Content-Type', 'application/json')
        .then(({ body }) => {
            expect(body).toMatchObject({
                access_token: expect.anything()
            });
            done();
        })
        .catch((error) => {
            done(error);
        })
    })

    test('POST /login without email or password should return 400', (done) => {
        const testData = {};

        request(app)
        .post(`${loginEndPoint}`)
        .expect(400)
        .send(testData)
        .set('Content-Type', 'application/json')
        .then(({ body }) => {
            expect(body).toMatchObject({
                messages: [
                    "Email/Password is required"
                ]
            });
            done();
        })
        .catch((error) => {
            done(error);
        })
    })

    test('POST /login with unregistered email or invalid password should return 401', (done) => {
        const testData = {
            email: "test_user_2@mail.com",
            password: "testuser123"
        };

        request(app)
        .post(`${loginEndPoint}`)
        .expect(401)
        .send(testData)
        .set('Content-Type', 'application/json')
        .then(({ body }) => {
            expect(body).toMatchObject({
                messages: [
                    "Email doesn't exists/Invalid Password"
                ]
            });
            done();
        })
        .catch((error) => {
            done(error);
        })
    })

    test('POST /login with customer account should return 401', (done) => {
        const testData = {
            email: "test_user_2@mail.com",
            password: "testuser123"
        };

        request(app)
        .post(`${loginEndPoint}`)
        .expect(401)
        .send(testData)
        .set('Content-Type', 'application/json')
        .then(({ body }) => {
            expect(body).toMatchObject({
                messages: [
                    "Email doesn't exists/Invalid Password"
                ]
            });
            done();
        })
        .catch((error) => {
            done(error);
        })
    })
})