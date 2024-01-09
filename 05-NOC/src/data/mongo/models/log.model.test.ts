import mongoose from "mongoose"
import { envs } from "../../../config/plugins/envs.plugin"
import { MongoDatabase } from "../init"
import { LogModel } from "./log.model"

describe("log.model.test.ts", () => {
  beforeAll(async () => {
    await MongoDatabase.connect({
      dbName: envs.MONGO_DB_NAME,
      mongoUrl: envs.MONGO_URL,
    })
  })

  afterAll(() => {
    mongoose.connection.close()
  })

  test("should return LogModel", async () => {
    const logData = {
      origin: "log.model.test.ts",
      message: "test-message",
      level: "low",
    }

    const log = await LogModel.create(logData)

    expect(log).toEqual(
      expect.objectContaining({
        ...logData,
        createdAt: expect.any(Date),
        id: expect.any(String),
      })
    )

    LogModel.findByIdAndDelete(log._id)
  })

  test("should return the schema object", () => {
    const schema = LogModel.schema.obj

    expect(schema).toEqual(
      expect.objectContaining({
        message: { type: expect.any(Function), required: true },
        origin: { type: expect.any(Function) },
        level: { type: expect.any(Function), enum: ["low", "medium", "high"] },
        createdAt: expect.any(Object),
      })
    )
  })
})
