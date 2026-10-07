import { env } from '../config/index'
import { webHooksSchemas } from '../schemas/'

export const webhookRoutes = [
  {
    method: 'GET',
    url: '/webhook',
    schema: webHooksSchemas.verifyRouteSchema,
    handler: (request: any, reply: any) => {
      const mode = request.query['hub.mode']
      const token = request.query['hub.verify_token']
      const challenge = request.query['hub.challenge']

      if (mode === 'subscribe' && token === env.verifyToken) {
        request.log.info('WEBHOOK_VERIFIED')
        return reply.type('text/plain').send(challenge)
      }

      return reply.code(403).type('text/plain').send('Forbidden')
    }

  },
  {
    method: 'POST',
    url: '/webhook',
    schema: webHooksSchemas.notifyRouteSchema,
    handler: (request: any, reply: any) => {
      request.log.debug({ body: request.body }, 'Received webhook')
      return reply.type('text/plain').send('EVENT_RECEIVED')
    }
  }
]


