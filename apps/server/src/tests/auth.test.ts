import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import app from "../app";
import { connectDatabase, disconnectDatabase } from "../configs/database";

let mongo: MongoMemoryServer;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  await connectDatabase(mongo.getUri());
});

afterEach(async () => {
  await mongoose.connection.db?.dropDatabase();
});

afterAll(async () => {
  await disconnectDatabase();
  await mongo.stop();
});

describe("auth", () => {
  it("creates a safe session without returning password material", async () => {
    const response = await request(app).post("/api/auth/signup").send({
      fullName: "Tarun Raj",
      username: "tarunraj",
      email: "tarun@example.com",
      password: "password123",
    });

    expect(response.status).toBe(201);
    expect(response.body.data.email).toBe("tarun@example.com");
    expect(response.body.data.password).toBeUndefined();
    expect(response.body.data.passwordHash).toBeUndefined();
    expect(response.headers["set-cookie"]).toBeDefined();
  });

  it("blocks protected routes without a session", async () => {
    const response = await request(app).get("/api/auth/me");

    expect(response.status).toBe(401);
  });
});
