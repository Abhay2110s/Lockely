// Winston logger — structured logging with file and console transports.
// HTTP access logs are piped through morgan into winston's stream.
import path from "path";
import winston from "winston";

const { combine, timestamp, printf, colorize, errors, json } = winston.format;

const logDir = path.resolve("logs");

// Pretty console format used outside production.
const consoleFormat = combine(
  colorize(),
  timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  errors({ stack: true }),
  printf(({ level, message, timestamp, stack }) => {
    return `[${timestamp}] ${level}: ${stack || message}`;
  })
);

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: combine(timestamp(), errors({ stack: true }), json()),
  transports: [
    // Persistent error log for post-mortem analysis.
    new winston.transports.File({
      filename: path.join(logDir, "error.log"),
      level: "error",
    }),
    // Combined log capturing all levels.
    new winston.transports.File({
      filename: path.join(logDir, "combined.log"),
    }),
  ],
  exitOnError: false,
});

// Pretty console output outside production; JSON in production.
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: consoleFormat,
    })
  );
} else {
  logger.add(
    new winston.transports.Console({
      format: combine(timestamp(), json()),
    })
  );
}

// Stream so morgan can pipe HTTP access logs through winston.
logger.stream = {
  write: (message) => logger.info(message.trim()),
};

export default logger;
