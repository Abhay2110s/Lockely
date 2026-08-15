// Authentication middleware — verifies the Clerk session token sent as
// `Authorization: Bearer <token>` from the frontend (Clerk's getToken()).
// On success, attaches { id, sessionId, claims } to req.user, where `id`
// is Clerk's stable user id (the JWT `sub` claim) — used everywhere in
// the app as the owning-user key for vault entries.
import { verifyToken } from "@clerk/backend";
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

  try {
    const claims = await verifyToken(bearer, {
      secretKey: env.CLERK_SECRET_KEY,
    });

    req.user = {
      id: claims.sub,
      sessionId: claims.sid,
      claims,
    };

    next();
  } catch (error) {
    throw ApiError.unauthorized("Invalid or expired session.");
  }
});

export default verifyAuth;
