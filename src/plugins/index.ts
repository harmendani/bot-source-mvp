import type { FastifyInstance, FastifyPluginAsync } from 'fastify'
import { createHealthCheckPlugin } from './health-check-plugin'
import { createHelmetPlugin } from './helmet-plugin'

const plugins: FastifyPluginAsync[] = [
  createHealthCheckPlugin({ path: '/health' }),
  createHelmetPlugin({ global: true })
]

export function registerPlugins(app: FastifyInstance): void {
  for (const plugin of plugins) {
    app.register(plugin)
  }
}
