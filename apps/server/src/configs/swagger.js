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
        url: `http://localhost:${env.PORT}`,
        description: "Local API",
      },
    ],
  },
  apis: ["src/modules/**/*.routes.ts", "src/routes/**/*.ts"],
});
