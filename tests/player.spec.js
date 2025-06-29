const { Pool } = require('pg')
const { getPlayers } = require('../controllers/playerController')

jest.mock('pg', () => {
  const mPool = {
    connect: jest.fn(),
    query: jest.fn(),
    end: jest.fn(),
  }
  return { Pool: jest.fn(() => mPool) }
})

const req = {}

const res = {
  writeHead: jest.fn(),
  end: jest.fn(),
}

describe('GET /players', () => {
  let pool
  beforeEach(() => {
    pool = new Pool()
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('calling getPlayers', () => {
    it('should call pool.connect, query, and end 1 time each.', async () => {
      pool.query.mockResolvedValueOnce({
        rows: [],
      })
      await getPlayers({}, res, pool)
      expect(pool.connect).toHaveBeenCalledTimes(1)
      expect(pool.query).toHaveBeenCalledTimes(1)
      expect(pool.end).toHaveBeenCalledTimes(1)
    })

    it('should call res.writeHead with type "application/json" one time.', async () => {
      pool.query.mockResolvedValueOnce({
        rows: [],
      })
      await getPlayers(req, res, pool)
      expect(res.writeHead).toHaveBeenCalledTimes(1)
      expect(res.writeHead).toHaveBeenCalledWith(200, {
        'Content-Type': 'application/json',
      })
    })

    it('should return call res.end one time with mock data', async () => {
      const mock = {
        rows: [
          {
            player_id: 1,
            player_name: 'test person',
            password: 'testpass',
          },
        ],
      }
      pool.query.mockResolvedValueOnce(mock)
      await getPlayers(req, res, pool)
      expect(res.end).toHaveBeenCalledTimes(1)
      expect(res.end).toHaveBeenCalledWith(JSON.stringify(mock.rows))
    })
  })
})
