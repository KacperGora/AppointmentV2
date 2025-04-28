require('dotenv').config();

module.exports = {
  dev: {
    driver: process.env.DB_DRIVER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT, 10),
  },
};
