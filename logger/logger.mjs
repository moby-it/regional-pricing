import winston, { format } from 'winston';

export const logger = winston.createLogger({
  level: 'info',
  format: format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.json()
  ),
  // defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.Console({
      format: winston.format.printf(info => `[${new Date().toISOString()}][${info.level.toUpperCase()}]: ${info.message}`),
    })
  ],
});

export const logInfo = (message) => {
  logger.info('info', message);
};