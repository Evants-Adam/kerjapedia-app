const request = require('supertest');
const app = require('../../app');
const { hashPassword } = require('../../helpers/hash-helper');
const { sign } = require('../../helpers/jwt-helper');
const { sequelize } =  require('../../models/index');
const { queryInterface } = sequelize;
const jobsData = require('../assets/jobs.json');

// Minor Data for Testing
let access_token = sign({ id: 1, email: "test_user_1@mail.com" });
let jobsEndPoint = "/jobs";
let invalidAccessToken = sign({ id: 2, email: "test_user_2@mail.com"});
let malformedAccessToken = sign({ id: 1, email: "test_user_1@mail.com" }) + "ABC";

beforeAll(async () => {
    // Query Bulk Delete to Database
    await queryInterface.bulkDelete('Companies', null, {
        truncate: true,
        restartIdentity: true,
        cascade: true
    })
    
    await queryInterface.bulkDelete('Jobs', null, {
        truncate: true,
        restartIdentity: true,
        cascade: true
    });

    await queryInterface.bulkDelete('Users', null, {
        truncate: true,
        restartIdentity: true,
        cascade: true
    })

    // Query Bulk Insert to Database
    await queryInterface.bulkInsert('Users', [{
        email: "test_user_1@mail.com",
        password: hashPassword("testuser123"),
        username: "test_user_1",
        role: "Admin",
        address: "Jakarta, Indonesia",
        phoneNumber: "+628987654321",
        createdAt: new Date(),
        updatedAt: new Date()
    }])

    await queryInterface.bulkInsert('Companies', [
        {
            name: "Hikari And Partners",
            companyLogo: "image-hikari-and-partners",
            location: "Greater Jakarta",
            email: "admin@hikaripartners.com",
            description: "Hikari Partners provides financial services for clients.",
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: "Eruditio Trade Bureau",
            companyLogo: "image-eruditio-trade-bureau",
            location: "Greater Jakarta",
            email: "admin@eruditio.com",
            description: "Eruditio produces, installs, maintains and modernizes lifts and escalators in many types of buildings including residential, commercial and high-rise buildings.",
            createdAt: new Date(),
            updatedAt: new Date()
        },
    ])

    await queryInterface.bulkInsert('Jobs', jobsData.map(el => {
        el.createdAt = new Date();
        el.updatedAt = new Date();

        return el
    }))
})

describe('TEST /jobs CMS End Point Feature', () => {
    // -- Start of GET -- Note: Data Testing JobId from 1 - 20!
    test('GET /jobs should return 200', (done) => {
        request(app)
        .get(`${jobsEndPoint}`)
        .expect(200)
        .set('access_token', access_token)
        .then(({ body }) => {
            expect(body.length).toBe(20);
            expect(body[10].id).toBe(11);
            done();
        })
        .catch((error) => {
            done(error);
        })
    })

    test('GET /jobs without access_token should return 400', (done) => {
        request(app)
        .get(`${jobsEndPoint}`)
        .expect(400)
        .then(({ body }) => {
            expect(body).toMatchObject({
                messages: [
                    "Missing Access Token"
                ]
            });
            done();
        })
        .catch((error) => {
            done(error);
        })
    })

    test('GET /jobs with expired/invalid access_token should return 401', (done) => {

        request(app)
        .get(`${jobsEndPoint}`)
        .expect(401)
        .set('access_token', invalidAccessToken)
        .then(({ body }) => {
            expect(body).toMatchObject({
                messages: [
                    "Not Authorized"
                ]
            });
            done();
        })
        .catch((error) => {
            done(error);
        })
    })

    test('GET /jobs with malformed JWT access_token should return 500', (done) => {
        request(app)
        .get(`${jobsEndPoint}`)
        .expect(500)
        .set('access_token', malformedAccessToken)
        .then(({ body }) => {
            expect(body).toMatchObject({
                messages: [
                    "Internal Server Error"
                ]
            });
            done();
        })
        .catch((error) => {
            done(error);
        })
    })

    test('GET /jobs/:id with valid job id should return 200', (done) => {
        let testId = 1;

        request(app)
        .get(`${jobsEndPoint}/${testId}`)
        .expect(200)
        .set({
            'Content-Type':'application/json', 
            'access_token': access_token
        })
        .then(({ body }) => {
            expect(body).toMatchObject({
                id: expect.any(Number),
                title: expect.anything(),
                description: expect.anything(),
                CompanyId: expect.any(Number),
                UserId: expect.any(Number),
                jobType: expect.anything(),
                status: expect.anything(),
                createdAt: expect.anything(),
                updatedAt: expect.anything(),
                Company: {
                    id: expect.any(Number),
                    name: expect.anything(),
                    companyLogo: expect.anything(),
                    location: expect.anything(),
                    email: expect.anything(),
                    description: expect.anything(),
                    createdAt: expect.anything(),
                    updatedAt: expect.anything()
	            }
            });
            done();
        })
        .catch((error) => {
            done(error);
        })
    })

    test('GET /jobs/:id with unavailable job id should return 404', (done) => {
        let testId = 99;

        request(app)
        .get(`${jobsEndPoint}/${testId}`)
        .expect(404)
        .set({
            'Content-Type':'application/json', 
            'access_token': access_token
        })
        .then(({ body }) => {
            expect(body).toMatchObject({
                messages: [
                    'Error Job Not Found'
                ]
            });
            done();
        })
        .catch((error) => {
            done(error);
        })
    })

    // -- End of GET --

    // -- Start of POST -- Note: Data Testing JobId from 1 - 20!
    test('POST /jobs should return 201', (done) => {
        let testPostJob = {
            title: 'Full Stack Developer',
            description: 'Full Stack Developer',
            CompanyId: 1,
            UserId: 1,
            jobType: 'Full-time'
        };

        request(app)
        .post(`${jobsEndPoint}`)
        .expect(201)
        .send(testPostJob)
        .set({
            'Content-Type':'application/json', 
            'access_token': access_token
        })
        .then(({ body }) => {
            expect(body).toMatchObject({
                id: expect.any(Number),
                title: expect.anything(),
                description: expect.anything(),
                CompanyId: expect.any(Number),
                UserId: expect.any(Number),
                jobType: expect.anything(),
                updatedAt: expect.anything(),                
                createdAt: expect.anything(),
                status: 'Active'
            });
            done();
        })
        .catch((error) => {
            done(error);
        })
    })

    test('POST /jobs without access_token should return 400', (done) => {
        let testPostJob = {
            title: 'Full Stack Developer',
            description: 'Full Stack Developer',
            CompanyId: 1,
            UserId: 1,
            jobType: 'Full-time'
        };

        request(app)
        .post(`${jobsEndPoint}`)
        .expect(400)
        .send(testPostJob)
        .set({
            'Content-Type':'application/json'
        })
        .then(({ body }) => {
            expect(body).toMatchObject({
                messages: [
                    "Missing Access Token"
                ]
            });
            done();
        })
        .catch((error) => {
            done(error);
        })
    })

    test('POST /jobs without any required fields should return 400', (done) => {
        let testPostJob = {};

        request(app)
        .post(`${jobsEndPoint}`)
        .expect(400)
        .send(testPostJob)
        .set({
            'Content-Type':'application/json', 
            'access_token': access_token
        })
        .then(({ body }) => {
            expect(body).toMatchObject({
                messages: [
                    "Title is required",
                    "Description is required",
                    "Company Type is required",
                    "Job Type is required"
                ]
            });
            done();
        })
        .catch((error) => {
            done(error);
        })
    })

    test('POST /jobs without one of the required fields should return 400', (done) => {
        let testPostJob = {
            title: 'Full Stack Developer 2',
            CompanyId: 1,
            UserId: 1,
            jobType: 'Full-time'
        };

        request(app)
        .post(`${jobsEndPoint}`)
        .expect(400)
        .send(testPostJob)
        .set({
            'Content-Type':'application/json', 
            'access_token': access_token
        })
        .then(({ body }) => {
            expect(body).toMatchObject({
                messages: [
                    "Description is required"
                ]
            });
            done();
        })
        .catch((error) => {
            done(error);
        })
    })

    test('POST /jobs with one of the required fields with empty string value should return 400', (done) => {
        let testPostJob = {
            title: 'Full Stack Developer 2',
            description: '',
            CompanyId: 1,
            UserId: 1,
            jobType: 'Full - time'
        };

        request(app)
        .post(`${jobsEndPoint}`)
        .expect(400)
        .send(testPostJob)
        .set({
            'Content-Type':'application/json', 
            'access_token': access_token
        })
        .then(({ body }) => {
            expect(body).toMatchObject({
                messages: [
                    "Description cannot be empty"
                ]
            });
            done();
        })
        .catch((error) => {
            done(error);
        })
    })

    // -- End of POST --

    // -- Start of PUT --
    test('PUT /jobs should return 200', (done) => {
        let testPostJob = {
            title: 'Full Stack Developer 3',
            description: 'Full Stack Developer 3',
            CompanyId: 1,
            UserId: 1,
            jobType: 'Full-time'
        },
        id = 1;

        request(app)
        .put(`${jobsEndPoint}/${id}`)
        .expect(200)
        .send(testPostJob)
        .set({
            'Content-Type':'application/json', 
            'access_token': access_token
        })
        .then(({ body }) => {
            expect(body).toMatchObject({
                id: 1,
                title: 'Full Stack Developer 3',
                description: 'Full Stack Developer 3',
                CompanyId: 1,
                UserId: 1,
                jobType: 'Full-time',
                status: expect.anything(),
                createdAt: expect.anything(),
                updatedAt: expect.anything()
            });
            done();
        })
        .catch((error) => {
            done(error);
        })
    })

    // -- End of PUT --

    // -- Start of DELETE -- 
    test('DELETE /jobs should return 200', (done) => {
        let id = 1;

        request(app)
        .delete(`${jobsEndPoint}/${id}`)
        .expect(200)
        .set({
            'Content-Type':'application/json', 
            'access_token': access_token
        })
        .then(({ body }) => {
            expect(body).toMatchObject({
                messages: [
                    'Full Stack Developer 3 with ID 1 success to delete'
                ]
            });
            done();
        })
        .catch((error) => {
            done(error);
        })
    })

    // -- End of DELETE --
})