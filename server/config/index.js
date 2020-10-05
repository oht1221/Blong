const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    MONGO_URL: process.env.MONGO_URL,
    MONGO_URL_OUTSIDE: process.env.MONGO_URL_OUTSIDE,
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
    AWS_SECRET_KEY: process.env.AWS_SECRET_KEY
};