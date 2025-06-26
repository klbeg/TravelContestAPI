const http = require('http')
const { getPlayers } = require('./controllers/playerController')

const server = http.createServer((req, res) => {
  const { method, url } = req
  switch (method) {
    case 'GET':
      switch (url) {
        case '/api/players':
          getPlayers(req, res)
      }
  }
})

const PORT = process.env.SERVER_PORT || 5000

server.listen(PORT, () => console.log(`server running on ${PORT}`))
