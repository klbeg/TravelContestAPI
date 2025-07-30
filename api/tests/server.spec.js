const http = require('http')
const supertest = require('supertest')
const { makeServer } = require('../server.js')

const getPlayers = jest.fn()
const getPlayerById = jest.fn()
const createPlayer = jest.fn()
const deletePlayer = jest.fn()
const controllers = { getPlayers, getPlayerById, createPlayer, deletePlayer }

const server = makeServer(controllers)

describe('http server', () => {
  describe('calling an invalid method / route', () => {
    test('should return a status code of 400', async () => {
      const res = await supertest(server).get('/bad-route')
      expect(JSON.parse(res.statusCode)).toBe(400)
    })

    test('should return an error message', async () => {
      const res = await supertest(server).get('/bad-route')
      expect(JSON.parse(res.error.text).message).toBe(
        "The specified route doesn't exist"
      )
    })
  })

  describe('GET /players', () => {
    beforeEach(() => {
      getPlayers.mockReset()
      getPlayers.mockImplementation((req, res) => {
        res.end()
      })
    })

    test('should call getPlayers once', async () => {
      await supertest(server).get('/api/players')
      expect(controllers.getPlayers).toHaveBeenCalledTimes(1)
    })
  })

  describe('GET /player/:id', () => {
    beforeEach(() => {
      getPlayerById.mockReset()
      getPlayerById.mockImplementation((req, res, id) => {
        res.end()
      })
    })

    test('should call getPlayerById once with a player id', async () => {
      await supertest(server).get('/api/player/1')
      expect(controllers.getPlayerById).toHaveBeenCalledTimes(1)
      expect(controllers.getPlayerById.mock.calls[0][2]).toBe(1)
    })
  })

  describe('POST /player', () => {
    beforeEach(() => {
      createPlayer.mockReset()
      createPlayer.mockImplementation((req, res, id) => {
        res.end()
      })
    })

    test('should call createPlayer once', async () => {
      await supertest(server).post('/api/player')
      expect(controllers.createPlayer).toHaveBeenCalledTimes(1)
    })
  })

  describe('DELETE /player/:id', () => {
    beforeEach(() => {
      deletePlayer.mockReset()
      deletePlayer.mockImplementation((req, res, id) => {
        res.end()
      })
    })

    test('should call deletePlayer once with a player id', async () => {
      await supertest(server).del('/api/player/1')
      expect(controllers.deletePlayer).toHaveBeenCalledTimes(1)
      expect(controllers.deletePlayer.mock.calls[0][2]).toBe(1)
    })
  })
})
