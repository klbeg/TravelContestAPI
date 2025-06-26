function findAll(pool) {
  return new Promise(async (resolve, reject) => {
    const query = 'SELECT * FROM player'

    await pool.connect()
    const { rows } = await pool.query(query)
    pool.end()

    resolve(rows)
  })
}

module.exports = {
  findAll,
}
