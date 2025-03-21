const path = require("path");
const dotenv = require("dotenv");
require("dotenv").config({ path: "/app_data/.env" });
var USER_PASSWORD = process.env.USER_PASSWORD;
var USER_NAME = process.env.USER_NAME;
var DATABASE_PORT = process.env.DATABASE_PORT;
var DATABASE_NAME = process.env.DATABASE_NAME;
const DATABASE_URL = process.env.DATABASE_URL;

if (!USER_PASSWORD || !USER_NAME || !DATABASE_PORT || !DATABASE_NAME) {
	dotenv.config({ path: path.resolve(__dirname, "../.env") });

	USER_PASSWORD = process.env.USER_PASSWORD;
	USER_NAME = process.env.USER_NAME;
	DATABASE_PORT = process.env.DATABASE_PORT;
	DATABASE_NAME = process.env.DATABASE_NAME;
}

module.exports = {
	development: {
		client: "postgresql",
		connection: DATABASE_URL ? DATABASE_URL : {
			host: "127.0.0.1",
			password: USER_PASSWORD,
			user: USER_NAME,
			port: DATABASE_PORT,
			database: DATABASE_NAME,
		},
	},
};
