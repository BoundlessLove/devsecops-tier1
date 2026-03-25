//logger.js
/* ESM version
import winston from "winston";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
*/
const winston = require("winston");
const path = require("path");
//__dirname works automatically in commonJS

const logger = winston.createLogger({
	level: "info",
	format: winston.format.combine(
		winston.format.timestamp(),
		winston.format.json()
	),
	transports: [
		new winston.transports.File({ filename: path.join(__dirname, "app.log") })
	]
});

module.exports = logger;