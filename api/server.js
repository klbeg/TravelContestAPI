const http = require('http')

function makeServer(controllers) {
  const server = http.createServer((req, res) => {
    const { method, url } = req
    switch (method) {
      case 'GET':
        switch (url) {
          case '/api/players':
            controllers.getPlayers(req, res)
            // res.writeHead(200, { 'Content-Type': 'application/json' })
            // res.end(
            //   JSON.stringify({
            //     message: 'docker container running as expected',
            //   })
            // )
            break
          default:
            res.writeHead(400, { 'Content-Type': 'application/json' })
            res.end(
              JSON.stringify({
                message: "The specified route doesn't exist",
              })
            )
            break
        }
        break
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
