const Players = require('../models/playerModel')
const { pool } = require('../db_connect')
const { getPostData } = require('../utils/dbUtils')

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

async function createPlayer(req, res) {
  try {
    const body = await getPostData(req)

    const { player_name, email, password } = JSON.parse(body)
    if (
      player_name === undefined ||
      email === undefined ||
      password == undefined
    ) {
      const message = { message: 'Missing data in request body' }
      res.writeHead(400, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(message))
    } else {
      const player = {
        player_name,
        email,
        password,
      }

      let newPlayer = await Players.create(pool, player)

      const message = {
        message: `New player created.  id: ${newPlayer.player_id}`,
      }

      res.writeHead(201, { 'Content-Type': 'application/json' })
      return res.end(JSON.stringify(message))
    }
  } catch (err) {
    console.log('Error in player controller: ', err)
  }
}

async function deletePlayer(req, res, id) {
  try {
    const player = await Players.deleteRecord(pool, id)
    let message

    if (player?.player_id === undefined) {
      message = { message: `No player exists with that id` }
      res.writeHead(404, { 'Content-Type': 'application/json' })
    } else {
      message = { message: `Player with id ${player.player_id} deleted` }
      res.writeHead(200, { 'Content-Type': 'application/json' })
    }

    res.end(JSON.stringify(message))
  } catch (err) {
    console.log('Error in player controller: ', err)
  }
}

module.exports = {
  getPlayers,
  getPlayerById,
  createPlayer,
  deletePlayer,
}
