const runCommand = async (args: string[]) => {
  process.argv = [...process.argv, ...args]
  const { args: argsPlugin } = await import("./args.plugin")
  return argsPlugin
}

describe("args.plugin.ts", () => {
  const originalArgv = process.argv

  beforeEach(() => {
    process.argv = originalArgv
    jest.resetModules()
  })

  test("should return default values", async () => {
    const argv = await runCommand(["-b", "5"])

    expect(argv).toEqual(
      expect.objectContaining({
        b: 5,
        l: 10,
        s: false,
        n: "multiplication-table",
        d: "./outputs",
      })
    )
  })

  test("should return configuration with custom values", async () => {
    const argv = await runCommand([
      "-b",
      "10",
      "-l",
      "15",
      "-s",
      "-n",
      "custom-table",
      "-d",
      "./custom-outputs",
    ])

    expect(argv).toEqual(
      expect.objectContaining({
        b: 10,
        l: 15,
        s: true,
        n: "custom-table",
        d: "./custom-outputs",
      })
    )
  })
})
