const {
  getPlayers,
  getPlayerById,
  createPlayer,
  deletePlayer,
} = require('./playerController')

const controllers = {
  getPlayers,
  getPlayerById,
  createPlayer,
  deletePlayer,
}

module.exports = {
  controllers,
}
