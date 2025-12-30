import dotenv from "dotenv"
dotenv.config()

import request from "supertest"
import mongoose from "mongoose"
import app from "../src/app.js"

describe("Auth APIs", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI)
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })

  it("should signup a new user", async () => {
    const res = await request(app)
      .post("/api/auth/signup")
      .send({
        fullName: "Test User",
        email: `test${Date.now()}@mail.com`,
        password: "password123"
      })

    expect(res.statusCode).toBe(201)
  })

  it("should login an existing user", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "admin@admin.com",
        password: "Admin@123"
      })

    expect(res.statusCode).toBe(200)
    expect(res.body.token).toBeDefined()
  })

  it("should reject invalid credentials", async () => {
  const res = await request(app)
    .post("/api/auth/login")
    .send({
      email: "admin@admin.com",
      password: "wrongpassword"
    })

  expect(res.statusCode).toBe(401)
})

})
