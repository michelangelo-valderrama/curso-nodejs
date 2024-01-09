import { ServerApp } from "./presentation/server-app"

describe("App", () => {
  test("should call Server.run with values", async () => {
    const serverRunMock = jest.fn()

    ServerApp.run = serverRunMock

    process.argv = [
      ...process.argv,
      "-b",
      "2",
      "-l",
      "2",
      "-n",
      "test-filename",
      "-d",
      "test-destination",
    ]
    await import("./app")

    expect(serverRunMock).toHaveBeenCalledWith({
      base: 2,
      limit: 2,
      showTable: false,
      fileName: "test-filename",
      fileDestination: "test-destination",
    })
  })
})
