const { getAge } = require("../../src/plugins/get-age.plugin")

describe("plugins/get-age.plugin.js", () => {
  test("getAge() should return the age of a person", () => {
    const birthdate = "1985-10-21"
    const age = getAge(birthdate)
    expect(typeof age).toBe("number")
  })

  // test("getAget should return 0 years", () => {
  //   const spy = jest.spyOn(Date.prototype, "getFullYear").mockReturnValue(1995)
  //   const birthdate = "1995-10-21"
  //   const age = getAge(birthdate)
  //   expect(age).toBe(0)
  //   expect(spy).toHaveBeenCalledWith()
  // })
})
