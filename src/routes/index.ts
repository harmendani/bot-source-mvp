import type { FastifyPluginAsync } from 'fastify'
import { webhookRoutes } from './webhook.routes.js'

export const routes: FastifyPluginAsync = async (app) => {
  app.addHook('onRequest', async (request) => {
    request.log.info(
      { ip: request.ip, method: request.method, url: request.url },
      'Request received'
    )
  })

  await app.register(webhookRoutes)
}
