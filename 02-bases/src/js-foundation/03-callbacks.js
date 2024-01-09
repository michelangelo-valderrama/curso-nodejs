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
  const user = users.find(function (user) {
    return user.id === id
  })
  if (!user) {
    return cb(`User not found with id ${id}`)
  }
  return cb(undefined, user)
}

module.exports = {
  getUserById,
}
