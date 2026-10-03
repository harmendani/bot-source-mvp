import type { FastifyPluginAsync } from 'fastify'
import { webhookRoutes } from './webhook.routes.js'

export const routes: FastifyPluginAsync = async (app) => {
  await app.register(webhookRoutes)
}
