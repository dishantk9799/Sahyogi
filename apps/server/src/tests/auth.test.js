import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import app from "../app.js";
import { connectDatabase, disconnectDatabase } from "../configs/database.js";
import { env } from "../configs/env.js";
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "../constants/cookies.js";
let mongo;
let userCount = 0;

async function createSessionCookies() {
  userCount += 1;

  const response = await request(app)
    .post("/api/auth/signup")
    .send({
      fullName: "Tarun Raj",
      username: `tarunraj${userCount}`,
      email: `tarun${userCount}@example.com`,
      password: "password123",
    });

  return response.headers["set-cookie"];
}

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

  it("rejects refresh without a cookie", async () => {
    const response = await request(app).post("/api/auth/refresh");
    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Refresh session is required");
  });

  it("rejects refresh with an invalid token cookie", async () => {
    const response = await request(app)
      .post("/api/auth/refresh")
      .set("Cookie", [`${REFRESH_TOKEN_COOKIE}=not-a-real-token`]);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid refresh session");
  });

  it("rejects signed access tokens with invalid payloads", async () => {
    const invalidAccessToken = jwt.sign({ sid: "session-only" }, env.JWT_ACCESS_SECRET);
    const response = await request(app)
      .get("/api/auth/me")
      .set("Cookie", [`${ACCESS_TOKEN_COOKIE}=${invalidAccessToken}`]);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid or expired session");
  });

  it("rejects invalid post ids before hitting database casts", async () => {
    const cookies = await createSessionCookies();
    const response = await request(app)
      .post("/api/posts/not-a-valid-id/publish")
      .set("Cookie", cookies);

    expect(response.status).toBe(422);
    expect(response.body.details.fieldErrors.id[0]).toBe("id must be a valid MongoDB ObjectId");
  });

  it("rejects invalid publication ids before hitting database casts", async () => {
    const cookies = await createSessionCookies();
    const response = await request(app)
      .patch("/api/publications/not-a-valid-id")
      .set("Cookie", cookies)
      .send({ tagline: "Updated tagline" });

    expect(response.status).toBe(422);
    expect(response.body.details.fieldErrors.id[0]).toBe("id must be a valid MongoDB ObjectId");
  });

  it("rejects invalid publication ids when creating posts", async () => {
    const cookies = await createSessionCookies();
    const response = await request(app)
      .post("/api/posts")
      .set("Cookie", cookies)
      .send({
        publicationId: "not-a-valid-id",
        title: "A real editorial workflow",
        content: {
          html: "<p>Hello</p>",
          text: "Hello",
        },
      });

    expect(response.status).toBe(422);
    expect(response.body.details.fieldErrors.publicationId[0]).toBe(
      "publicationId must be a valid MongoDB ObjectId",
    );
  });

  it("returns author and publication summaries for published posts", async () => {
    const cookies = await createSessionCookies();
    const publicationResponse = await request(app)
      .post("/api/publications")
      .set("Cookie", cookies)
      .send({
        name: "Craft Notes",
        slug: "craft-notes",
        tagline: "Practical essays for builders",
      });

    const postResponse = await request(app)
      .post("/api/posts")
      .set("Cookie", cookies)
      .send({
        publicationId: publicationResponse.body.data.id,
        title: "Nested API Shape",
        subtitle: "A contract test for the reader UI",
        content: {
          html: "<p>Hello</p>",
          text: "Hello",
        },
      });

    await request(app).post(`/api/posts/${postResponse.body.data.id}/publish`).set("Cookie", cookies);

    const listResponse = await request(app).get("/api/posts");
    const detailResponse = await request(app).get(`/api/posts/${postResponse.body.data.slug}`);

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.data[0].author.fullName).toBe("Tarun Raj");
    expect(listResponse.body.data[0].publication.name).toBe("Craft Notes");
    expect(detailResponse.status).toBe(200);
    expect(detailResponse.body.data.author.username).toMatch(/^tarunraj/);
    expect(detailResponse.body.data.publication.slug).toBe("craft-notes");
  });

  it("sanitizes post html before storing content", async () => {
    const cookies = await createSessionCookies();
    const publicationResponse = await request(app)
      .post("/api/publications")
      .set("Cookie", cookies)
      .send({
        name: "Security Notes",
        slug: "security-notes",
      });

    const response = await request(app)
      .post("/api/posts")
      .set("Cookie", cookies)
      .send({
        publicationId: publicationResponse.body.data.id,
        title: "Sanitized Post Content",
        content: {
          html: '<p>Hello<script>alert("xss")</script><a href="javascript:alert(1)">bad</a></p>',
          text: "Hello bad",
        },
      });

    expect(response.status).toBe(201);
    expect(response.body.data.content.html).not.toContain("<script");
    expect(response.body.data.content.html).not.toContain("javascript:");
  });
});
