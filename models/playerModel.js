function findAll(pool) {
  return new Promise(async (resolve, reject) => {
    const query = 'SELECT * FROM player'

    const { rows } = await pool.query(query)

    resolve(rows)
  })
}

module.exports = {
  findAll,
}
