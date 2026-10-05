import helmet, { type FastifyHelmetOptions } from '@fastify/helmet'
import type { FastifyPluginAsync } from 'fastify'

export function createHelmetPlugin(options: FastifyHelmetOptions): FastifyPluginAsync {
  return async (app) => {
    await app.register(helmet, options)
  }
}
