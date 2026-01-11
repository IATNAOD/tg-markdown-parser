// configure dotenv
require("dotenv").config();

module.exports = {
	LBA_URL: process.env.LBA_URL ? process.env.LBA_URL : "",
	DOMAIN: process.env.DOMAIN ? process.env.DOMAIN : "",
	TOKEN: process.env.TOKEN ? process.env.TOKEN : "",
	HOST: process.env.HOST ? process.env.HOST : "0.0.0.0",
	PORT: process.env.PORT ? process.env.PORT : "4081",
};
