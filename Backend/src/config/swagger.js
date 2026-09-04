import path from "path";
import swaggerJSDoc from "swagger-jsdoc";

const routesPath = path.resolve(process.cwd(), "src/routes/*.js");
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Lockely API",
      version: "1.0.0",
      description:
        "API documentation for Lockely — an encrypted password vault with strength " +
        "checking, generation, reuse detection, expiry tracking, and a security dashboard.",
    },
    servers: [{ url: "/", description: "Current server" }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
    tags: [
      { name: "Auth", description: "Registration, login, OTP verification, and password reset" },
      { name: "Password", description: "Password strength check & generation utilities" },
      { name: "Vault", description: "Encrypted password vault CRUD and analytics" },
    ],
  },
  apis: [routesPath, "./src/routes/*.js"],
};

let swaggerSpec = { openapi: "3.0.0", info: { title: "Lockely API", version: "1.0.0" }, paths: {} };
try {
  swaggerSpec = swaggerJSDoc(options);
} catch (e) {
  // Safe fallback if glob scan fails in serverless bundle
}

export default swaggerSpec;
