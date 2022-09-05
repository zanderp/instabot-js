const { transports, format, createLogger } = require('winston');
const winstonTimestampColorize = require('winston-timestamp-colorize');

require('dotenv').config();

/* Creating a logger object that will be used to log messages to the console and to a log file. */
const logger = createLogger({
    level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
    format: format.combine(
        format.splat(),
        format.timestamp({format:'YYYY-MM-DD hh:mm:ss'}),
        format.colorize(),
        winstonTimestampColorize({color: 'magenta'}),
        format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)),
    transports: [
        new transports.File({ filename: './logs/error.log', level: 'error' }),
        new transports.File({ filename: './logs/combined.log' }),
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console());
}

module.exports = logger;
