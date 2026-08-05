// Authentication middleware — verifies the JWT sent either as an
// httpOnly cookie ("token") or as a Bearer token in the Authorization
// header, and attaches the decoded payload to req.user.
import jwt from "jsonwebtoken";
import env from "../config/env.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

const verifyToken = asyncHandler(async (req, res, next) => {
  // Extract token from the Authorization header if it starts with "Bearer ".
  const bearer = req.headers.authorization?.startsWith("Bearer ")
    ? req.headers.authorization.split(" ")[1]
    : null;

  // Prefer the httpOnly cookie; fall back to the Bearer token.
  const token = req.cookies?.token || bearer;

  if (!token) {
    throw ApiError.unauthorized("Unauthorized. Please login.");
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    throw ApiError.unauthorized("Invalid or expired token.");
  }
});

export default verifyToken;
