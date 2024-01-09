const { characters } = require("../../src/js-foundation/02-destructuring")

describe("js-foundation/02-destructuring.js", () => {
  test("characters should containt Flash & Superman", () => {
    expect(characters).toContain("Flash")
    expect(characters).toContain("Superman")
  })
  test("first characters should be Flashm & second Superman", () => {
    const [flash, superman] = characters
    expect(flash).toBe("Flash")
    expect(superman).toBe("Superman")
  })
})
