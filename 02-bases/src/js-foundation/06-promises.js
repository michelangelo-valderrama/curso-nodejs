// module.exports.getPokemonById = (id, cb) => {
//   const url = `https://pokeapi.co/api/v2/pokemon/${id}`
//   return fetch(url)
//     .then((res) => res.json())
//     .then((pokemon) => pokemon.name)
// }
const { http } = require("../plugins")

module.exports.getPokemonById = async (id) => {
  try {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const pokemon = await http.get(url)
    return pokemon.name
  } catch (error) {
    throw `Pokemon not found with id ${id}`
  }
}
