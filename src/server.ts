import Fastify from 'fastify'
import { env } from './config'
import { AppLogController, loggerOptions } from './config/logger'
import registerPlugins from './plugins'
import routes from './routes'
import { shutDown } from './shutdown'
import { generateUniqueId } from './utils/gen-unique-id'

const fastify = Fastify({
  logger: loggerOptions,
  logController: new AppLogController(),
  genReqId: () => generateUniqueId(),
  bodyLimit: 1024,
  trustProxy: true,
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


