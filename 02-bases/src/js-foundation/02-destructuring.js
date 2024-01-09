const { SHELL, PWD, LC_NAME, LANG, TERM_PROGRAM, USERNAME, USER, TERM } =
  process.env

// console.log(SHELL, PWD, LC_NAME, LANG, TERM_PROGRAM, USERNAME, USER, TERM)

characters = ["Flash", "Superman", "Green Lantern", "Batman"]
const [, , , batman] = characters

module.exports = {
  characters,
}
