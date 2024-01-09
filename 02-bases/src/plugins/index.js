const { getUUID } = require("./get-id.plugin")
const { getAge } = require("./get-age.plugin")
const { http } = require("./http-client.plugin")
const { buildLogger, logger } = require("./logger.plugins")

module.exports = {
  getUUID,
  getAge,
  http,
  buildLogger,
  logger,
}
