import { Players } from '../models/playerModel.js'
import { pool } from '../database/travel_contest_db.js'

export async function getPlayers(req, res) {
  try {
    const players = await Players.findAll(pool)

    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(players))
  } catch (err) {
    console.log('Error in player controller: ', err)
  }
}
