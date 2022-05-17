'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Companies', [{
      name: "Trade Bureau of Indonesia",
      companyLogo: "image-trade-bureau-indonesia",
      location: "Greater Jakarta",
      email: "admin@tradebureau.go.id",
      description: "Trade Bureau Indonesia provides accomodations and facilities for Industries within Indonesia.",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Hikari And Partners",
      companyLogo: "image-hikari-and-partners",
      location: "Greater Jakarta",
      email: "admin@hikaripartners.com",
      description: "Hikari Partners provides financial services for clients.",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Companies', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};