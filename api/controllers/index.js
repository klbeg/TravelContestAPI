const { getPlayers, getPlayerById } = require('./playerController')

const controllers = {
  getPlayers,
  getPlayerById,
}

module.exports = {
  controllers,
}
