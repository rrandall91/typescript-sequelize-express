module.exports = {
  development: {
    username: "postgres",
    password: "password",
    database: "intrepid_development",
    host: "db",
    dialect: "postgres",
    logging: false,
  },
  test: {
    username: "postgres",
    password: "password",
    database: "intrepid_test",
    host: "db",
    dialect: "postgres",
    logging: false,
  },
  production: {
    username: "postgres",
    password: "password",
    database: "intrepid",
    host: "db",
    dialect: "postgres",
    logging: false,
  }
};
