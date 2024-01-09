const { getPokemonById } = require("../../src/js-foundation/06-promises")

describe("fs-foundation/06-promises.js", () => {
  test("getPokemonById should return a pokemon", async () => {
    const pokemonId = "pikachu"
    const pokemonName = await getPokemonById(pokemonId)
    expect(pokemonName).toBe("pikachu")
  })
  test("getPokemonById should return an error", async () => {
    const pokemonId = "hello"
    try {
      await getPokemonById(pokemonId)
    } catch (err) {
      expect(err).toBe(`Pokemon not found with id ${pokemonId}`)
    }
  })
})
