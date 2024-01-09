const { getUserById } = require("../../src/js-foundation/03-callbacks")

describe("fs-foundation/03-callbacks.js", () => {
  test("getUserById should return an error if user does not exist", () => {
    const id = 4
    getUserById(id, (err, user) => {
      expect(err).toBe(`User not found with id ${id}`)
      expect(user).toBeUndefined()
    })
  })
  test("getUserById should return Username 01", () => {
    const id = 1
    getUserById(id, (err, user) => {
      expect(err).toBeUndefined()
      expect(user).toEqual({
        id,
        name: "Username 01",
      })
    })
  })
})
