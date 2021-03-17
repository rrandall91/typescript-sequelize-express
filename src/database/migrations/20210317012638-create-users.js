const tableName = "users";

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        tableName,
        {
          id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
          },
          password: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          created_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            allowNull: false,
          },
          updated_at: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
          },
        },
        { transaction }
      );
    }),

  down: async (queryInterface) =>
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.dropTable(tableName, { transaction });
    }),
};
