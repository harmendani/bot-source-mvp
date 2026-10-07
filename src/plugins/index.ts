import type { FastifyInstance, FastifyPluginAsync } from 'fastify'
import { createHealthCheckPlugin } from './health-check-plugin'

const plugins: FastifyPluginAsync[] = [
  createHealthCheckPlugin({ path: '/6nghx9qh8gv5u09xgbuaivp4/health' }),
]

export default function registerPlugins(app: FastifyInstance): void {
  for (const plugin of plugins) {
    app.register(plugin)
  }
}
