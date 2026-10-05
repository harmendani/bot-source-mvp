import Fastify from 'fastify'
import { env } from './config'
import { registerPlugins } from './plugins'
import { routes } from './routes'


const fastify = Fastify({
  logger: { level: env.logLevel }
})

registerPlugins(fastify)
fastify.register(routes)

fastify.listen({ port: env.port, host: '0.0.0.0' },
  function (err) {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  })
