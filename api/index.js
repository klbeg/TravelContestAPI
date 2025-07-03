const { makeServer } = require('./server')
const { controllers } = require('./controllers/index')

const PORT = process.env.PORT || 5000

const server = makeServer(controllers)

server.listen(PORT, () => console.log(`server running on ${PORT}`))
