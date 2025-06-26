const http = require('http')
const { getPlayers } = require('./controllers/playerController')

function makeServer(controllers) {
  const server = http.createServer((req, res) => {
    const { method, url } = req
    switch (method) {
      case 'GET':
        switch (url) {
          case '/api/players':
            controllers.getPlayers(req, res)
        }
    }
  })
  return (this.server = server)
}

module.exports = {
  makeServer,
}
