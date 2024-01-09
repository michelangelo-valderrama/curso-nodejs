const users = [
  {
    id: 1,
    name: "Username 01",
  },
  {
    id: 2,
    name: "Username 02",
  },
]

function getUserById(id, cb) {
  const user = users.find((user) => user.id === id)
  return user ? cb(null, { user }) : cb(`User not found with id ${id}`)
}

module.exports = {
  getUserById,
}
