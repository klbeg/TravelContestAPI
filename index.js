const { makeServer } = require('./server')
const { controllers } = require('./controllers/index')

const server = makeServer(controllers)

const PORT = process.env.SERVER_PORT || 5000

server.listen(PORT, () => console.log(`server running on ${PORT}`))
