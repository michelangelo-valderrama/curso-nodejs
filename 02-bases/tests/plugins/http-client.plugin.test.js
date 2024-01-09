const { http } = require("../../src/plugins/http-client.plugin")

describe("plugins/http-client.plugin.js", () => {
  test("http.get() should return a string", async () => {
    const data = await http.get("https://jsonplaceholder.typicode.com/todos/1")
    expect(data).toEqual({
      userId: 1,
      id: 1,
      title: expect.any(String),
      completed: expect.any(Boolean),
    })
  })

  test("http should have POST method", () => {
    const post = http.post
    expect(typeof post).toBe("function")
  })
})
