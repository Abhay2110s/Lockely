// Async handler wrapper — catches rejected promises thrown
// inside async route handlers and forwards them to Express's
// `next`, so they land in the global error middleware instead
// of crashing the process or being silently swallowed.
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
