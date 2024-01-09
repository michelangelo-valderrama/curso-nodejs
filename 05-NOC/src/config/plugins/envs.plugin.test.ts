import { envs } from "./envs.plugin"

describe("envs.plugin.ts", () => {
  test("should return env options", () => {
    expect(envs).toEqual({
      PROD: false,
      PORT: 3000,
      MAILER_SERVICE: "gmail",
      MAILER_EMAIL: "limonranitasandwich@gmail.com",
      MAILER_SECRET_KEY: "xfhf tvus lrvh izbf",
      MONGO_URL: "mongodb://mik:123@localhost:27017/?authMechanism=DEFAULT",
      MONGO_DB_NAME: "NOC-TEST",
      MONGO_USER: "mik",
      MONGO_PASS: "123",
    })
  })

  test("should return error if not found env", () => {
    process.env.PORT = "ABC"
  })
})
