const { Pool } = require('pg')
const { getPlayers, getPlayerById } = require('../controllers/playerController')

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

describe('GET', () => {
  let pool
  beforeEach(() => {
    pool = new Pool()
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('GET /players => calling getPlayers', () => {
    it('should call res.writeHead with type "application/json" one time', async () => {
      pool.query.mockResolvedValueOnce({
        rows: [],
      })
      await getPlayers(req, res)
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
      await getPlayers(req, res)
      expect(res.end).toHaveBeenCalledTimes(1)
      expect(res.end).toHaveBeenCalledWith(JSON.stringify(mock.rows))
    })
  })

  describe('GET /player/:id => calling getPlayerById', () => {
    it('should call res.writeHead with type "application/json" one time', async () => {
      pool.query.mockResolvedValueOnce({
        rows: [],
      })
      await getPlayerById(req, res, 1)
      expect(res.writeHead).toHaveBeenCalledTimes(1)
      expect(res.writeHead).toHaveBeenCalledWith(200, {
        'Content-Type': 'application/json',
      })
    })

    it('should find the player and call res.end one time with mock data', async () => {
      const mock = {
        rows: [
          {
            player_id: 1,
            player_name: 'test person',
            email: 'test@email.com',
            password: 'testpass',
          },
        ],
      }
      pool.query.mockResolvedValueOnce(mock)
      await getPlayerById(req, res, 1)
      expect(res.end).toHaveBeenCalledTimes(1)
      expect(res.end).toHaveBeenCalledWith(JSON.stringify(mock.rows))
    })
  })
})
