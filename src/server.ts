import Fastify from 'fastify'
import { env } from './config'
import registerPlugins from './plugins'
import routes from './routes'
import { shutDown } from './shutdown'

const fastify = Fastify({
  logger: { level: env.logLevel },
  bodyLimit: 1024
})

registerPlugins(fastify)
fastify.register(routes)

process.on('SIGTERM', shutDown(fastify));
process.on('SIGINT', shutDown(fastify));

fastify.listen({ port: env.port, host: '::' },
  function (err) {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  })


