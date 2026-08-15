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
        // Clerk session token passed in the Authorization header.
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
      { name: "Auth", description: "Local profile sync/session (Clerk owns sign-up/sign-in)" },
      { name: "Password", description: "Password strength check & generation utilities" },
      { name: "Vault", description: "Encrypted password vault CRUD and analytics" },
    ],
  },
  // Scan all route files for @openapi annotations to build the spec.
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
