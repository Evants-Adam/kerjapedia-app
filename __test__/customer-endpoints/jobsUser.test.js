const request = require('supertest');
const app = require('../../app');
const { hashPassword } = require('../../helpers/hash-helper');
const { sign } = require('../../helpers/jwt-helper');
const { sequelize } =  require('../../models/index');
const { queryInterface } = sequelize;
const jobsData = require('../assets/jobs.json');

// Minor Data for Testing
let access_token = sign({ id: 1, email: "test_user_1@mail.com" });
let jobsEndPoint = "/public/jobs";
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
    await queryInterface.bulkInsert('Users', [
        {
            email: "test_user_1@mail.com",
            password: hashPassword("testuser123"),
            username: "test_user_1",
            role: "Customer",
            address: "Jakarta, Indonesia",
            phoneNumber: "+628987654321",
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ])

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

describe('TEST /public/jobs End Point Feature', () => {
    // -- Start of GET -- Note: Data Testing JobId from 1 - 20!
    test('GET /public/jobs should return data with status "Active" and status code 200', (done) => {
        request(app)
        .get(`${jobsEndPoint}?page=1`)
        .expect(200)
        .set('access_token', access_token)
        .then(({ body }) => {
            const { totalItems, jobs, totalPages, currentPage } = body;
            expect(totalItems).toBe(15);
            expect(jobs[0].status).toBe('Active');
            expect(jobs.length).toBe(10);
            expect(totalPages).toBe(2);
            expect(currentPage).toBe(1);
            done();
        })
        .catch((error) => {
            done(error);
        })
    })

    test('GET /public/jobs without access_token should return 400', (done) => {
        request(app)
        .get(`${jobsEndPoint}?page=1`)
        .expect(400)
        .then(({ body }) => {
            expect(body).toMatchObject({
                messages: [
                    "Missing Access Token"
                ]
            })
            done();
        })
        .catch((error) => {
            done(error);
        })
    })

    test('GET /public/jobs with invalid/expired access_token should return 401', (done) => {
        request(app)
        .get(`${jobsEndPoint}?page=1`)
        .expect(401)
        .set('access_token', invalidAccessToken)
        .then(({ body }) => {
            expect(body).toMatchObject({
                messages: [
                    "Not Authorized"
                ]
            })
            done();
        })
        .catch((error) => {
            done(error);
        })
    })

    test('GET /public/jobs with malformed access_token should return 500', (done) => {
        request(app)
        .get(`${jobsEndPoint}?page=1`)
        .expect(500)
        .set('access_token', malformedAccessToken)
        .then(({ body }) => {
            expect(body).toMatchObject({
                messages: [
                    "Internal Server Error"
                ]
            })
            done();
        })
        .catch((error) => {
            done(error);
        })
    })

    test('GET /public/jobs page 2 should return data with status "Active" and status code 200', (done) => {
        request(app)
        .get(`${jobsEndPoint}?page=2`)
        .expect(200)
        .set('access_token', access_token)
        .then(({ body }) => {
            const { totalItems, jobs, totalPages, currentPage } = body;
            expect(totalItems).toBe(15);
            expect(jobs[0].status).toBe('Active');
            expect(jobs.length).toBe(5);
            expect(totalPages).toBe(2);
            expect(currentPage).toBe(2);
            done();
        })
        .catch((error) => {
            done(error);
        })
    })

    test('GET /public/jobs page 2 without access_token should return 400', (done) => {
        request(app)
        .get(`${jobsEndPoint}?page=2`)
        .expect(400)
        .then(({ body }) => {
            expect(body).toMatchObject({
                messages: [
                    "Missing Access Token"
                ]
            })
            done();
        })
        .catch((error) => {
            done(error);
        })
    })

    test('GET /public/jobs with one query filter by job name should return 200', (done) => {
        request(app)
        .get(`${jobsEndPoint}?page=1&name=Human`)
        .expect(200)
        .set('access_token', access_token)
        .then(({ body }) => {
            const { totalItems, jobs, totalPages, currentPage } = body;
            expect(totalItems).toBe(2);
            expect(jobs.length).toBe(2);
            expect(totalPages).toBe(1);
            expect(currentPage).toBe(1);
            done();
        })
        .catch((error) => {
            done(error);
        })
    })

    test('GET /public/jobs with one query filter by job name without access_token should return 400', (done) => {
        request(app)
        .get(`${jobsEndPoint}?page=1&name=Human`)
        .expect(400)
        .then(({ body }) => {
            expect(body).toMatchObject({
                messages: [
                    "Missing Access Token"
                ]
            })
            done();
        })
        .catch((error) => {
            done(error);
        })
    })

    test('GET /public/jobs with one query filter by company name should return 200', (done) => {
        request(app)
        .get(`${jobsEndPoint}?page=1&company=Hikari`)
        .set('access_token', access_token)
        .expect(200)
        .then(({ body }) => {
            const { totalItems, jobs, totalPages, currentPage } = body;
            expect(totalItems).toBe(8);
            expect(jobs.length).toBe(8);
            expect(totalPages).toBe(1);
            expect(currentPage).toBe(1);
            done();
        })
        .catch((error) => {
            done(error);
        })
    })

    test('GET /public/jobs with one query filter by company name and without access_token should return 400', (done) => {
        request(app)
        .get(`${jobsEndPoint}?page=1&company=Hikari`)
        .expect(400)
        .then(({ body }) => {
            expect(body).toMatchObject({
                messages: [
                    "Missing Access Token"
                ]
            })
            done();
        })
        .catch((error) => {
            done(error);
        })
    })

    test('GET /jobs with 2 queries filter by job name and company name should return 200', (done) => {
        request(app)
        .get(`${jobsEndPoint}?page=1&name=Human&company=Hikari`)
        .expect(200)
        .set('access_token', access_token)
        .then(({ body }) => {
            const { totalItems, jobs, totalPages, currentPage } = body;
            expect(totalItems).toBe(1);
            expect(jobs.length).toBe(1);
            expect(totalPages).toBe(1);
            expect(currentPage).toBe(1);
            done();
        })
        .catch((error) => {
            done(error)
        })
    })

    test('GET /jobs with 2 queries filter by job name and company name and without access_token should return 400', (done) => {
        request(app)
        .get(`${jobsEndPoint}?page=1&name=Human&company=Hikari`)
        .expect(400)
        .then(({ body }) => {
            expect(body).toMatchObject({
                messages: [
                    "Missing Access Token"
                ]
            })
            done();
        })
        .catch((error) => {
            done(error)
        })
    })

    test('GET /public/jobs/:id should return 200', (done) => {
        request(app)
        .get(`${jobsEndPoint}/10`)
        .expect(200)
        .set('access_token', access_token)
        .then(({ body }) => {
            expect(body.id).toBe(10);
            expect(body.title).toBe('Accounting Manager');
            done();
        })
        .catch((error) => {
            done(error);
        })
    })

    test('GET /public/jobs/:id without access_token should return 400', (done) => {
        request(app)
        .get(`${jobsEndPoint}/10`)
        .expect(400)
        .then(({ body }) => {
            expect(body).toMatchObject({
                messages: [
                    "Missing Access Token"
                ]
            })
            done();
        })
        .catch((error) => {
            done(error);
        })
    })

    test('GET /jobs/:id without valid id should return 404', (done) => {
        request(app)
        .get(`${jobsEndPoint}/99`)
        .expect(404)
        .set('access_token', access_token)
        .then(({ body }) => {
            expect(body).toMatchObject({
                messages: [
                    "Error Job Not Found"
                ]
            });
            done();
        })
        .catch((error) => {
            done(error);
        })
    })
    // -- End of GET --
})
