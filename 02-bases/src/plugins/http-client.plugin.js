const axios = require("axios")

const httpClientPlugin = {
  get: async (url) => {
    const { data } = await axios.get(url)
    return data
    // const resp = await fetch(url)
    // return await resp.json()
  },
  post: async (url, body) => {
    throw new Error("Not implemented")
  },
}

module.exports = { http: httpClientPlugin }
