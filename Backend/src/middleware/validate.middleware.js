// Validation middleware — creates an Express middleware that validates
// req.body (and optionally req.query) against a Zod schema. On success,
// the parsed/coerced value replaces the original so downstream handlers
// get sanitized data.
import ApiError from "../utils/ApiError.js";

const validate = (schema, source = "body") => (req, res, next) => {
  const result = schema.safeParse(req[source]);

  if (!result.success) {
    // Map Zod validation issues into a clean field-level error list.
    const details = result.error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));

    return next(ApiError.badRequest("Validation failed.", details));
  }

  // Replace raw input with the parsed/coerced data.
  req[source] = result.data;
  next();
};

export default validate;
