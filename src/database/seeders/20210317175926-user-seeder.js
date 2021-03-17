const tableName = "users";

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(tableName, [
      {
        id: 1,
        name: "Rashaad Randall",
        email: "hello@rashaadrandall.com",
        password: "password",
      },
      {
        id: 2,
        name: "Demian Seiler",
        email: "demianseiler@intrepid-networks.com",
        password: "password",
      },
      {
        id: 3,
        name: "Joe McCall",
        email: "joemccall@intrepid-networks.com",
        password: "password",
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete(tableName, null, {});
  },
};
