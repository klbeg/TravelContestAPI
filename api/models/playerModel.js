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

module.exports = {
  findAll,
  findById,
}
