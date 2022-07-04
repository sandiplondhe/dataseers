require("dotenv").config({ override: true });
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOSTNAME,
    port: process.env.DATABASE_PORT,
    dialect: process.env.DATABASE_DIALECT,
    logging: false,
    pool: { max: 5, min: 0, idle: 10000 },
  }
);
sequelize
  .authenticate()
  .then(() => console.log("Connected successfully"))
  .catch((err) => console.error(err));

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./users")(sequelize, DataTypes);
db.task = require("./task")(sequelize, DataTypes);

db.sequelize.sync().then(() => {
  console.log("Re-sync");
});

module.exports = db;
