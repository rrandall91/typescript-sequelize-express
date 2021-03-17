const tableName = "posts";
const userId = "user_id";

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.addColumn(
        tableName,
        userId,
        {
          type: Sequelize.INTEGER,
          references: {
            model: "users",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        { transaction }
      );

      await queryInterface.addIndex(tableName, [ userId ], { transaction });

    }),

  down: async (queryInterface) =>
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.removeColumn(tableName, userId, { transaction });
    }),
};
