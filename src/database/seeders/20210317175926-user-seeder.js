const tableName = "users";

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(tableName, [
      {
        name: "Rashaad Randall",
        email: "hello@rashaadrandall.com",
        password: "password",
      },
      {
        name: "Demian Seiler",
        email: "demianseiler@intrepid-networks.com",
        password: "password",
      },
      {
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
