// Winston logger — structured logging with file and console transports.
// HTTP access logs are piped through morgan into winston's stream.
import fs from "fs";
import path from "path";
import winston from "winston";

const { combine, timestamp, printf, colorize, errors, json } = winston.format;

// Serverless platforms (Vercel, AWS Lambda, etc.) ship a read-only
// filesystem — the only writable path is /tmp, and even that doesn't
// persist across invocations, so file logging there is pointless and
// unsafe. Detect that environment and skip file transports entirely;
// rely on console/stdout logging instead, which Vercel already captures
// and shows in the function logs.
const isServerless = Boolean(
  process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME
);

// Pretty console format used outside production.
const consoleFormat = combine(
  colorize(),
  timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  errors({ stack: true }),
  printf(({ level, message, timestamp, stack }) => {
    return `[${timestamp}] ${level}: ${stack || message}`;
  })
);

const fileTransports = [];

if (!isServerless) {
  const logDir = path.resolve("logs");

  // Only attempt file logging locally, and only after making sure the
  // directory actually exists — winston's File transport does not
  // create parent directories for you.
  try {
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    fileTransports.push(
      // Persistent error log for post-mortem analysis.
      new winston.transports.File({
        filename: path.join(logDir, "error.log"),
        level: "error",
      }),
      // Combined log capturing all levels.
      new winston.transports.File({
        filename: path.join(logDir, "combined.log"),
      })
    );
  } catch {
    // If we can't create the logs directory for any reason, fall back
    // to console-only logging rather than crashing the process.
  }
}

const defaultConsole = new winston.transports.Console({
  format: combine(timestamp(), json()),
});

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: combine(timestamp(), errors({ stack: true }), json()),
  transports: fileTransports.length > 0 ? fileTransports : [defaultConsole],
  exitOnError: false,
});

// Guard against any transport-level stream errors (e.g. disk issues)
// crashing the whole process — log to stderr instead of throwing.
logger.on("error", (error) => {
  // eslint-disable-next-line no-console
  console.error("Logger transport error:", error);
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
