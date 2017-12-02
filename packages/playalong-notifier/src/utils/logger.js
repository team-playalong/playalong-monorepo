const winston = require('winston');
const fs = require('fs');
require('winston-daily-rotate-file');
const moment = require('moment');
const {LOG_LEVELS, FILE_PATHS, NODE_ENVS} = require('./constants');

const env = process.env.NODE_ENV || NODE_ENVS.DEVELOPMENT;

winston.setLevels( winston.config.npm.levels );
winston.addColors( winston.config.npm.colors );

if ( !fs.existsSync( FILE_PATHS.LOGS_FOLDER ) ) {
  // Create the directory if it does not exist
  fs.mkdirSync( FILE_PATHS.LOGS_FOLDER );
}

function formatter(options) {
  const { timestamp, message, level, meta } = options;
  const msg = meta.stack ? meta.stack : message;
  return `{${timestamp()}} - ${level.toUpperCase()}: ${msg}\n`;
}

function logToFileConfig({ fileName, level }) {
  let config = {
    filename: fileName,
    datePattern: 'yyyy-MM-dd.log',
    meta: true,
    timestamp: () => moment().format('DD-MM HH:mm:ss.SSS'),
    preprend: true,
    zippedArchive: true,
    json: false,
    formatter
  };
  if (level) {
    config.level = level;
  }
  return config;
}

export const logger = new ( winston.Logger )({
  transports: [
    new winston.transports.Console({
      level: LOG_LEVELS.INFO,
      colorize: true
    }),
    new winston.transports.DailyRotateFile(logToFileConfig({
      fileName: FILE_PATHS.INFO_LOG_FILE,
      level: env === NODE_ENVS.DEVELOPMENT ? LOG_LEVELS.DEBUG : LOG_LEVELS.INFO
    }))
  ],
  exceptionHandlers: [
    new winston.transports.DailyRotateFile(logToFileConfig({
      fileName: FILE_PATHS.EXCEPTIONS_LOG_FILE
    }))
  ]
});

let expressLogger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.DailyRotateFile)(logToFileConfig({
      fileName: FILE_PATHS.EXPRESS_LOG_FILE
    }))
  ]
});

export function loggerProfile(req, res, next) {
  req.profileInfo = `${req.method} ${req.originalUrl}`;
  expressLogger.profile(req.profileInfo);
  let sendFn = res.send;
  res.send = function() {
    sendFn.apply(res, arguments);
    expressLogger.profile(req.profileInfo);
  };
  next();
}
