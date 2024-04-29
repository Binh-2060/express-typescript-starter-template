import { createLogger, format, transports } from 'winston';

const { json, timestamp, combine } = format;
const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    json()
  ),
  transports: [new transports.Console()],
});

export default logger;
