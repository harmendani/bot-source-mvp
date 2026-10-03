import Fastify from 'fastify'
import { env } from './config/index.js'
import { routes } from './routes/index.js'

const fastify = Fastify({
  logger: { level: env.logLevel }
})

fastify.register(routes)

fastify.listen({ port: env.port, host: '0.0.0.0' },
  function (err) {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  })
