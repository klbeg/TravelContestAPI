function findAll(pool) {
  return new Promise(async (resolve, reject) => {
    const query = 'SELECT * FROM player'

    const { rows } = await pool.query(query)

    resolve(rows)
  })
}

function findById(pool, id) {
  return new Promise(async (resolve, reject) => {
    const query = {
      text: 'SELECT * FROM player WHERE player_id = $1',
      values: [id],
    }

    const { rows } = await pool.query(query)
    resolve(rows)
  })
}

function create(pool, player) {
  return new Promise(async (resolve, reject) => {
    const query = {
      text: 'INSERT INTO player(player_name, email, password) VALUES($1, $2, $3) RETURNING player_id, player_name',
      values: [player.player_name, player.email, player.password],
    }

    const { rows } = await pool.query(query)
    resolve(rows[0])
  })
}

function deleteRecord(pool, id) {
  return new Promise(async (resolve, reject) => {
    const query = {
      text: 'DELETE FROM player WHERE player_id = $1 RETURNING player_id',
      values: [id],
    }

    const { rows } = await pool.query(query)
    resolve(rows[0])
  })
}

module.exports = {
  findAll,
  findById,
  create,
  deleteRecord,
}
