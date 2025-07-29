const Players = require('../models/playerModel')
const { pool } = require('../db_connect')

async function getPlayers(req, res) {
  try {
    const players = await Players.findAll(pool)

    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(players))
  } catch (err) {
    console.log('Error in player controller: ', err)
  }
}

async function getPlayerById(req, res, id) {
  try {
    const player = await Players.findById(pool, id)
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(player))
  } catch (err) {
    console.log('Error in player controller: ', err)
  }
}

module.exports = {
  getPlayers,
  getPlayerById,
}
