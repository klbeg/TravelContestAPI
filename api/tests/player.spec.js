const { Pool } = require('pg')
const {
  getPlayers,
  getPlayerById,
  createPlayer,
} = require('../controllers/playerController')

jest.mock('pg', () => {
  const mPool = {
    connect: jest.fn(),
    query: jest.fn(),
    end: jest.fn(),
  }
  return { Pool: jest.fn(() => mPool) }
})

const req = {
  on: jest.fn((event, callback) => {
    if (event === 'data') {
      callback(Buffer.from(JSON.stringify({ data: 'first chunk' })))
    } else if (event === 'end') {
      callback()
    }
  }),
}

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
    it('should call res.writeHead once with type "application/json"', async () => {
      pool.query.mockResolvedValueOnce({
        rows: [],
      })
      await getPlayers(req, res)
      expect(res.writeHead).toHaveBeenCalledTimes(1)
      expect(res.writeHead).toHaveBeenCalledWith(200, {
        'Content-Type': 'application/json',
      })
    })

    it('should return call res.end once with correct data', async () => {
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
    it('should call res.writeHead once with type "application/json"', async () => {
      pool.query.mockResolvedValueOnce({
        rows: [],
      })
      await getPlayerById(req, res, 1)
      expect(res.writeHead).toHaveBeenCalledTimes(1)
      expect(res.writeHead).toHaveBeenCalledWith(200, {
        'Content-Type': 'application/json',
      })
    })

    it('should call res.end once with correct data', async () => {
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

  describe('POST /player => calling createPlayer', () => {
    it('should call res.writeHead once with type "application/json"', async () => {
      pool.query.mockResolvedValueOnce({
        rows: [{ player_id: 12 }],
      })
      await createPlayer(req, res)
      expect(res.writeHead).toHaveBeenCalledTimes(1)
      expect(res.writeHead).toHaveBeenCalledWith(201, {
        'Content-Type': 'application/json',
      })
    })

    it('should call res.end once with correct message', async () => {
      pool.query.mockResolvedValueOnce({
        rows: [{ player_id: 12 }],
      })
      await createPlayer(req, res)
      expect(res.end).toHaveBeenCalledTimes(1)
      expect(res.end).toHaveBeenCalledWith(
        JSON.stringify({
          message: 'New player created.  id: 12',
        })
      )
    })
  })
})
