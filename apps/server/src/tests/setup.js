"use strict";
process.env.NODE_ENV = "test";
process.env.MONGO_URI = process.env.MONGO_URI ?? "mongodb://127.0.0.1:27017/sahyogi-test";
process.env.JWT_ACCESS_SECRET =
  process.env.JWT_ACCESS_SECRET ?? "test-access-secret-with-enough-length";
process.env.JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET ?? "test-refresh-secret-with-enough-length";
process.env.CLIENT_URL = process.env.CLIENT_URL ?? "http://localhost:3000";
