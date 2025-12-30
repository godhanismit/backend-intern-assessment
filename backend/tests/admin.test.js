import dotenv from "dotenv"
dotenv.config()


import request from "supertest"
import mongoose from "mongoose"
import app from "../src/app.js"

let adminToken = ""

describe("Admin APIs", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI)

    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "admin@admin.com",
        password: "Admin@123"
      })

    adminToken = res.body.token
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })

  it("should allow admin to fetch users", async () => {
    const res = await request(app)
      .get("/api/users?page=1")
      .set("Authorization", `Bearer ${adminToken}`)

    expect(res.statusCode).toBe(200)
    expect(res.body.users).toBeDefined()
  })

  it("should block request without token", async () => {
    const res = await request(app)
      .get("/api/users?page=1")

    expect(res.statusCode).toBe(401)
  })
  
})
