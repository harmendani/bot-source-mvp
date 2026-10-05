import type { FastifyPluginAsync } from 'fastify'

interface HealthCheckOptions {
  path: string
}

export function createHealthCheckPlugin({ path }: HealthCheckOptions): FastifyPluginAsync {
  return async (app) => {
    app.get(
      path,
      { schema: { response: { 200: { type: 'string' } } } },
      async (_request, reply) => reply.type('text/plain').send('OK')
    )
  }
}
