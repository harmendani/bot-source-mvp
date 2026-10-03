import type { FastifyPluginAsync } from 'fastify'
import { env } from '../config/index'

interface VerifyQuery {
  'hub.mode': string
  'hub.verify_token': string
  'hub.challenge': string
}

export const webhookRoutes: FastifyPluginAsync = async (app) => {
  app.get<{ Querystring: VerifyQuery }>(
    '/webhook',
    {
      schema: {
        querystring: {
          type: 'object',
          required: ['hub.mode', 'hub.verify_token', 'hub.challenge'],
          properties: {
            'hub.mode': { type: 'string' },
            'hub.verify_token': { type: 'string' },
            'hub.challenge': { type: 'string' }
          }
        },
        response: {
          200: { type: 'string' },
          403: { type: 'string' }
        }
      }
    },
    async (request, reply) => {
      const mode = request.query['hub.mode']
      const token = request.query['hub.verify_token']
      const challenge = request.query['hub.challenge']

      if (mode === 'subscribe' && token === env.verifyToken) {
        request.log.info('WEBHOOK_VERIFIED')
        return reply.type('text/plain').send(challenge)
      }

      return reply.code(403).type('text/plain').send('Forbidden')
    }
  )

  app.post(
    '/webhook',
    {
      schema: {
        body: { type: 'object', additionalProperties: true },
        response: { 200: { type: 'string' } }
      }
    },
    async (request, reply) => {
      request.log.debug({ body: request.body }, 'Received webhook')
      return reply.type('text/plain').send('EVENT_RECEIVED')
    }
  )
}
