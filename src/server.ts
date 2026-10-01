import Fastify from 'fastify'
import { env } from './config/index.js'

const fastify = Fastify({
  logger: { level: env.logLevel }
})

fastify.get('/', function (request, reply) {
  reply.send({ hello: 'bot ok!' })
})

fastify.listen({ port: env.port, host: '0.0.0.0' },
  function (err, address) {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  })
