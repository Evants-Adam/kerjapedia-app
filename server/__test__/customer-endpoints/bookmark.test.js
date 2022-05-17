const request = require('supertest');
const app = require('../../app');
const { hashPassword } = require('../../helpers/hash-helper');
const { sign } = require('../../helpers/jwt-helper');
const { sequelize } =  require('../../models/index');
const { queryInterface } = sequelize;
const jobsData = require('../assets/jobs.json');

// Minor Data for Testing
let accessTokenCustomer = sign({ id: 1, email: "test_user_1@mail.com" });
let accessTokenAdmin = sign({ id: 2, email: "test_user_2@mail.com" });
let bookmarkEndPoint = "/public/bookmark";

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

    await queryInterface.bulkDelete('Bookmarks', null, {
        truncate: true,
        restartIdentity: true
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
        },
        {
            email: "test_user_2@mail.com",
            password: hashPassword("testuser123"),
            username: "test_user_2",
            role: "Admin",
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

    await queryInterface.bulkInsert('Bookmarks', [
        {
            UserId: 1,
            JobId: 5,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            UserId: 2,
            JobId: 3,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            UserId: 1,
            JobId: 10,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            UserId: 1,
            JobId: 11,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            UserId: 2,
            JobId: 17,
            createdAt: new Date(),
            updatedAt: new Date()
        },
    ])
})

describe('TEST /public/bookmark AND /public/bookmark/:id End Points', () => {
    // -- Start of GET --
    test('GET /public/bookmark with role Customer should return 200', (done) => {
        request(app)
        .get(bookmarkEndPoint)
        .expect(200)
        .set('access_token', accessTokenCustomer)
        .then(({ body }) => {
            // Should only contain three bookmarked jobs
            expect(body.length).toBe(3)
            done()
        })
        .catch((error) => {
            done(error)
        })
    })

    test('GET /public/bookmark with role other than Customer should return 403', (done) => {
        request(app)
        .get(bookmarkEndPoint)
        .expect(403)
        .set('access_token', accessTokenAdmin)
        .then(({ body }) => {
            expect(body).toMatchObject({
                messages: [
                    "Forbidden"
                ]
            })
            done()
        })
        .catch((error) => {
            done(error)
        })
    })

    // -- End of GET --

    // -- Start of POST -- Note: Data Testing JobId from 1 - 20!
    test('POST /bookmark/:id with role Customer and valid JobId should return 201', (done) => {
        request(app)
        .post(`${bookmarkEndPoint}/10`) // Data Testing JobId from 1 - 20
        .expect(201)
        .set('access_token', accessTokenCustomer)
        .then(({ body }) => {
            expect(body).toMatchObject({
                id: expect.any(Number),
                UserId: expect.any(Number),
                JobId: expect.any(Number)
            })
            done()
        })
        .catch((error) => {
            done(error)
        })
    })

    test('POST /bookmark/:id without access_token should return 400', (done) => {
        request(app)
        .post(`${bookmarkEndPoint}/10`)
        .expect(400)
        .then(({ body }) => {
            expect(body).toMatchObject({
                messages: [
                    "Missing Access Token"
                ]
            })
            done()
        })
        .catch((error) => {
            done(error)
        })
    })
    
    test('POST /bookmark/:id with role other than Customer should return 403', (done) => {
        request(app)
        .post(`${bookmarkEndPoint}/2`)
        .expect(403)
        .set('access_token', accessTokenAdmin)
        .then(({ body }) => {
            expect(body).toMatchObject({
                messages: [
                    "Forbidden"
                ]
            })
            done()
        })
        .catch((error) => {
            done(error)
        })
    })

    test('POST /bookmark/:id with access_token but invalid JobId should return 404', (done) => {
        request(app)
        .post(`${bookmarkEndPoint}/99`)
        .expect(404)
        .set('access_token', accessTokenCustomer)
        .then(({ body }) => {
            expect(body).toMatchObject({
                messages: [
                    "Error Job Not Found"
                ]
            })
            done()
        })
        .catch((error) => {
            done(error)
        })
    })

    // -- End of POST --
})