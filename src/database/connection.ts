import { Sequelize } from "sequelize";

const ENV: string = process.env.NODE_ENV || "development";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require("./config/db.config")[ENV];

export default new Sequelize(config.database, config.username, config.password, config);
