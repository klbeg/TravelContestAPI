const http = require('http')
const supertest = require('supertest')
const { makeServer } = require('../server.js')

const getPlayers = jest.fn()
const controllers = { getPlayers }

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
})
