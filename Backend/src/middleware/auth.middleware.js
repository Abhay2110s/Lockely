// Authentication middleware — verifies a JWT sent as
// `Authorization: Bearer <token>` from the frontend.
// On success, attaches { id } to req.user where `id` is the
// MongoDB User._id string — used everywhere as the owning-user key.
import jwt from "jsonwebtoken";
import env from "../config/env.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

const verifyAuth = asyncHandler(async (req, res, next) => {
  const bearer = req.headers.authorization?.startsWith("Bearer ")
    ? req.headers.authorization.split(" ")[1]
    : null;

  if (!bearer) {
    throw ApiError.unauthorized("Unauthorized. Please sign in.");
  }

  let payload;
  try {
    payload = jwt.verify(bearer, env.JWT_SECRET);
  } catch (err) {
    throw ApiError.unauthorized("Invalid or expired session. Please sign in again.");
  }

  if (!payload?.userId) {
    throw ApiError.unauthorized("Invalid token payload.");
  }

  req.user = { id: payload.userId };
  next();
});

export default verifyAuth;
