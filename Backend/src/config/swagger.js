// Swagger/OpenAPI specification definition — scanned from route files to
// auto-generate interactive API documentation served at /api-docs.
import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "PassGuardian API",
      version: "1.0.0",
      description:
        "API documentation for PassGuardian — an encrypted password vault with strength " +
        "checking, generation, reuse detection, expiry tracking, and a security dashboard.",
    },
    servers: [{ url: "/", description: "Current server" }],
    components: {
      securitySchemes: {
        // JWT Bearer token passed in the Authorization header.
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    // Default security requirement applied to all endpoints unless overridden.
    security: [{ bearerAuth: [] }],
    tags: [
      { name: "Auth", description: "Registration, login, OTP verification, and password reset" },
      { name: "Password", description: "Password strength check & generation utilities" },
      { name: "Vault", description: "Encrypted password vault CRUD and analytics" },
    ],
  },
  // Scan all route files for @openapi annotations to build the spec.
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
