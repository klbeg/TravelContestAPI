const http = require('http')

function makeServer(controllers) {
  const server = http.createServer((req, res) => {
    const { method, url } = req
    let abbrUrl = url.split('/').slice(2).join('/')
    switch (method) {
      case 'GET':
        if (abbrUrl.match('players')) {
          controllers.getPlayers(req, res)
          break
        } else if (abbrUrl.match('player/([0-9]+)')) {
          const id = Number(abbrUrl.split('/')[1])
          controllers.getPlayerById(req, res, id)
          break
        } else {
          res.writeHead(400, { 'Content-Type': 'application/json' })
          res.end(
            JSON.stringify({
              message: "The specified route doesn't exist",
            })
          )
          break
        }

      case 'POST':
        if (abbrUrl.match('player')) {
          controllers.createPlayer(req, res)
          break
        } else {
          res.writeHead(400, { 'Content-Type': 'application/json' })
          res.end(
            JSON.stringify({
              message: "The specified route doesn't exist",
            })
          )
          break
        }

      case 'DELETE':
        if (abbrUrl.match('player/([0-9]+)')) {
          const id = Number(abbrUrl.split('/')[1])
          controllers.deletePlayer(req, res, id)
          break
        } else {
          res.writeHead(400, { 'Content-Type': 'application/json' })
          res.end(
            JSON.stringify({
              message: "The specified route doesn't exist",
            })
          )
          break
        }

      default:
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(
          JSON.stringify({ message: "The specified route doesn't exist" })
        )
    }
  })

  return (this.server = server)
}

module.exports = {
  makeServer,
}
