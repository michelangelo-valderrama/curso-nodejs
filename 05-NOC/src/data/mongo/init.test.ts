import { envs } from "../../config/plugins/envs.plugin"
import { MongoDatabase } from "./init"
import mongoose from "mongoose"

describe("init MongoDB", () => {
  afterAll(() => {
    mongoose.connection.close()
  })
  test("should connect to MongoDB", async () => {
    const connectionState = await MongoDatabase.connect({
      dbName: envs.MONGO_DB_NAME,
      mongoUrl: envs.MONGO_URL,
    })
    expect(connectionState).toBe(1)
  })
})
