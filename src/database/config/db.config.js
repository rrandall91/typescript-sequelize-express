module.exports = {
  development: {
    username: "postgres",
    password: "password",
    database: "intrepid_development",
    host: "db",
    dialect: "postgres"
  },
  test: {
    username: "postgres",
    password: "password",
    database: "intrepid_test",
    host: "db",
    dialect: "postgres"
  },
  production: {
    username: "postgres",
    password: "password",
    database: "intrepid",
    host: "db",
    dialect: "postgres"
  }
};
