import swaggerJsdoc from "swagger-jsdoc";
import { env } from "./env.js";
export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Sahyogi Publishing API",
      version: "0.1.0",
      description: "API contract for the Sahyogi writer and publication platform.",
    },
    servers: [
      {
        url: env.API_PUBLIC_URL || `http://localhost:${env.PORT}`,
        description: env.API_PUBLIC_URL ? "Configured API" : "Local API",
      },
    ],
  },
  apis: ["src/modules/**/*.routes.js", "src/routes/**/*.js"],
});
